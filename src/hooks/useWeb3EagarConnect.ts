import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../connectors";
import { isMobile } from "react-device-detect";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useApplicationUserState } from "../store/user/hooks";

export const useDisconnect = () => {
  const { connector, activate } = useWeb3React();
  return useCallback(() => {
    if (connector instanceof InjectedConnector && window.ethereum.isMetaMask) {
      activate(null);
      return;
    } else if (connector instanceof WalletConnectConnector) {
      (connector as any).close();
      return;
    }
    activate(null);
  }, [activate, connector]);
};

export function useWeb3EagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);
  const { appChainId } = useApplicationUserState();
  useEffect(() => {
    if (isMobile) {
      activate(injected(appChainId))
        .then(() => {
          setTried(true);
        })
        .catch(() => {
          setTried(false);
        });
    }

    injected(appChainId)
      .isAuthorized()
      .then((isAuthorized: boolean) => {
        if (isAuthorized) {
          activate(injected(appChainId), undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
  }, [activate, appChainId]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();
  const { appChainId } = useApplicationUserState();

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        activate(injected(appChainId));
      };
      // eslint-disable-next-line
      const handleChainChanged = (chainId: string | number) => {
        activate(injected(appChainId));
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected(appChainId));
        }
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate, appChainId]);
}
