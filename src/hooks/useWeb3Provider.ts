import { JsonRpcProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { rpcUrls } from "../constants/chain";
import { useApplicationUserState } from "../store/user/hooks";

export const useWeb3Provider = () => {
  const context = useWeb3React();

  const { appChainId } = useApplicationUserState();

  return useMemo(() => {
    const customProvider = new JsonRpcProvider(rpcUrls[appChainId]);
    context.library =
      context.active && appChainId === context.chainId
        ? context.library
        : customProvider;
    return context;
  }, [context, appChainId]);
};
