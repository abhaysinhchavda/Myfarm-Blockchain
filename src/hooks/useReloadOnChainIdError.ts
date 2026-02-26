import { useEffect } from "react";
import { useActionScreenType } from "../store/application/hooks";
import { useChainIdError } from "./useChainIdError";

export const useReloadOnChainIdError = () => {
  const chainIdError = useChainIdError();
  const action = useActionScreenType();
  useEffect(() => {
    if (chainIdError && action.searchKey) {
      window.location.reload();
    }
  }, [chainIdError, action]);
};
