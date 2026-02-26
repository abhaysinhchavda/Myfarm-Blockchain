import { InjectedConnector } from "@web3-react/injected-connector";
import { hexlify, hexStripZeros } from "ethers/lib/utils";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
//import {  validateAddress } from "../../utilities";
import { AppDispatch, AppState } from "..";
import { BSC_CHAIN, POLYGON_CHAIN, ETH_CHAIN, AVAX_CHAIN } from "../../constants/chain";
import { useWeb3Provider } from "../../hooks/useWeb3Provider";
import {
  setAppChainId,
  setCollapseSidebar,
  setPoolsTabPosition,
  setStakesTabPosition,
  setView,
} from "./actions";
import { PoolsTabPosition, StakeTabPosition, Views } from "./reducer";
// import { activateOrDeactivateGaslessMode } from "./actions";


export const useChangeAppChainId = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { connector } = useWeb3Provider();
  return useCallback(
    async (newAppChainId: number, noSwitch?: boolean) => {
      const isMetaMask = window.ethereum && window.ethereum.isMetaMask;
      try {
        if (connector instanceof InjectedConnector && isMetaMask) {
          const ethereum = window.ethereum;
          if (newAppChainId === BSC_CHAIN && !noSwitch) {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: hexlify(BSC_CHAIN) }],
            });
          } else if (newAppChainId === POLYGON_CHAIN && !noSwitch) {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: hexStripZeros(hexlify(POLYGON_CHAIN)),
                },
              ],
            });
          } else if (newAppChainId === ETH_CHAIN && !noSwitch) {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: hexStripZeros(hexlify(ETH_CHAIN)) }],
            });
          }else if (newAppChainId === AVAX_CHAIN && !noSwitch){
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: hexStripZeros(hexlify(AVAX_CHAIN)) }],
            });
          }
        }
        dispatch(
          setAppChainId({
            appChainId: newAppChainId,
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    },
    [dispatch, connector]
  );
};

export const useApplicationUserState = () => {
  return useSelector((state: AppState) => state.user);
};

export const useSetCollapseSideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (collapseSideBar: boolean) => {
      dispatch(
        setCollapseSidebar({
          collapseSideBar,
        })
      );
    },
    [dispatch]
  );
};

export const useSetView = () => {
  const dispatch = useDispatch();
  return useCallback(
    (view: Views) => {
      dispatch(
        setView({
          view,
        })
      );
    },
    [dispatch]
  );
};

export const useChangePoolsTabPosition = () => {
  const dispatch = useDispatch();
  return useCallback(
    (poolTabPosition: PoolsTabPosition) => {
      dispatch(
        setPoolsTabPosition({
          poolTabPosition,
        })
      );
    },
    [dispatch]
  );
};

export const useChangeStakesTabPosition = () => {
  const dispatch = useDispatch();
  return useCallback(
    (myStakeTabPosition: StakeTabPosition) => {
      dispatch(
        setStakesTabPosition({
          myStakeTabPosition,
        })
      );
    },
    [dispatch]
  );
};

/* export const useSetRefferalAddress = () => {
  const dispatch = useDispatch();
  return useCallback(
    (ref: string) => {
      dispatch(
        setRefererAddress({
          referrer: ref,
        })
      );
    },
    [dispatch]
  );
};

export const useSelectReferAddress = (): string => {
  return useSelector((state: AppState) => {
    return state.users.referrer;
  });
}; */

/* export const useSetReferrer = () => {
  // gather query string
  var { ref } = useQueryString();
  // account information
  const { account } = useWeb3React();

  // you cannot refer itself

  if (ref === undefined) {
    ref = REFFERAL_ADDRESS;
  }
  // check the reff}eral_addrerss
  if (!validateAddress(ref as string)) {
    ref = REFFERAL_ADDRESS;
  }

  // store this
  const setRefer = useSetRefferalAddress();
  // set the refferal address onto the store.

  useEffect(() => {
    if (!ref) return null;
    // set the referar address
    setRefer(ref as string);
  }, [ref]);
}; */

/* export const useGasSettings = ():boolean => {
  return useSelector((state: AppState) => state.user.gasLessMode);
};

export const useChoseGasLessMode = (): <()=> void> => {
  const dispatch = useDispatch();
  const isGaslessModeActive = useGasSettings();
  return useCallback(() => {
    dispatch(
      activateOrDeactivateGaslessMode({
        gasLessMode: !isGaslessModeActive,
      })
    );
  }, [isGaslessModeActive,dispatch]);
}; */
