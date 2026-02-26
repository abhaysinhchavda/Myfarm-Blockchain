import { JsonRpcProvider } from "@ethersproject/providers";
import { rpcUrls } from "../constants/chain";
import store from "../store";

export const getDefaultRPCProvider = (): JsonRpcProvider => {
  const state = store.getState();
  const appChainId = state.user.appChainId;
  const provider = new JsonRpcProvider(rpcUrls[appChainId]);
  return provider;
};
