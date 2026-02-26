import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import {
  avaxRpcUrl,
  bscRpcUrl,
  ethRpcUrl,
  polygonRpcUrl,
} from "../constants/chain";

// eslint-disable-next-line
export const injected = (chainId: number) => {
  return new InjectedConnector({
    supportedChainIds: [4, 97, 80001, 43113],
  });
};

export const walletconnect = (chainId: number) => {
  return new WalletConnectConnector({
    rpc: {
      4: ethRpcUrl,
      97: bscRpcUrl,
      80001: polygonRpcUrl,
      43113: avaxRpcUrl,
    },
    bridge: "https://relay.bridge.walletconnect.org",
    qrcode: true,
    supportedChainIds: [chainId],
  });
};
