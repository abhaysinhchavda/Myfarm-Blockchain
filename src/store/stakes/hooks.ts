import { useAppCohorts } from "../application/hooks";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "..";
import { useWeb3React } from "@web3-react/core";
import { useApplicationUserState } from "../user/hooks";
import { getActiveStakingDetails } from "../../utilities/stakes";
import { useTokenlist } from "../lists/hooks";
import { isEmpty } from "lodash";
import { setUserClaimHistory, setUserStakes } from "./action";
import { StakeTabPosition } from "../user/reducer";
import { getClaimHistory } from "../../utilities/claims";
import { useChainIdError } from "../../hooks/useChainIdError";
import { StakeDetails } from "./reducer";

export const useSetStakes = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (stakes: StakeDetails[], noStakesFound: boolean) => {
      dispatch(setUserStakes({ stakes, noStakesFound }));
    },
    [dispatch]
  );
};

export const useSetClaims = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (claims: StakeDetails[], noClaimFound: boolean) => {
      dispatch(setUserClaimHistory({ claims, noClaimFound }));
    },
    [dispatch]
  );
};

export const useSetUserStakings = () => {
  const { account } = useWeb3React();
  const { appChainId } = useApplicationUserState();
  const cohorts = useAppCohorts();
  const tokenlist = useTokenlist();
  const chainIdError = useChainIdError();
  const setStakes = useSetStakes();

  return useCallback(async () => {
    if (!account || isEmpty(tokenlist) || isEmpty(cohorts) || chainIdError)
      return null;
    setStakes([], false);
    const stakes = await getActiveStakingDetails(
      appChainId,
      cohorts,
      tokenlist,
      account
    );
    if (isEmpty(stakes)) {
      setStakes([], true);
      return;
    }
    setStakes(stakes, false);
  }, [account, appChainId, tokenlist, cohorts, chainIdError, setStakes]);
};

export const useSetUserClaims = () => {
  const setClaims = useSetClaims();
  const { appChainId } = useApplicationUserState();
  const { account } = useWeb3React();
  const tokenlist = useTokenlist();
  const chainIdError = useChainIdError();
  const appCohorts = useAppCohorts();

  return useCallback(async () => {
    if (!account || isEmpty(tokenlist) || isEmpty(appCohorts) || chainIdError)
      return null;
    setClaims([], false);
    const claims = await getClaimHistory(
      appChainId,
      account,
      tokenlist,
      appCohorts
    );
    if (isEmpty(claims)) {
      setClaims([], false);
      return;
    }

    setClaims(claims, false);
  }, [account, appChainId, tokenlist, chainIdError, appCohorts, setClaims]);
};

export const useObtainUserStakes = () => {
  const setUserStakings = useSetUserStakings();
  useEffect(() => {
    setUserStakings();
  }, [setUserStakings]);
};

export const useSetClaimHistory = () => {
  const setUserClaims = useSetUserClaims();

  useEffect(() => {
    setUserClaims();
  }, [setUserClaims]);
};

export const useDeriveStakes = () => {
  const { myStakeTabPosition } = useApplicationUserState();
  const myStakesOrClaims = useSelector((state: AppState) => state.stakes);
  const stakesOrClaims = useMemo(() => {
    if (myStakeTabPosition === StakeTabPosition.CLAIM) {
      return myStakesOrClaims.claims;
    }
    return myStakesOrClaims.stakes;
  }, [myStakeTabPosition, myStakesOrClaims]);
  return {
    noStakesFound: myStakesOrClaims.noStakesFound,
    noClaimFound: myStakesOrClaims.noClaimFound,
    stakesOrClaims,
  };
};
