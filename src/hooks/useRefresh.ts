import { useCallback, useState } from "react";
import { useSetUserClaims, useSetUserStakings } from "../store/stakes/hooks";

export const useRefresh = (): {
  refreshButton: boolean;
  disableRefresh: () => void;
} => {
  const [refreshButton, disableRefreshButton] = useState<boolean>(true);
  const setUserStakes = useSetUserStakings();
  const setUserClaims = useSetUserClaims();
  const disableRefresh = useCallback(() => {
    disableRefreshButton(false);
    setUserStakes();
    setUserClaims();
  }, [setUserClaims, setUserStakes]);

  return { refreshButton, disableRefresh };
};
