import { useCallback, useEffect, useMemo, useState } from "react";
import { useActionScreenType, useAppCohorts } from "../store/application/hooks";
import _ from "loadsh";
import { useApplicationUserState } from "../store/user/hooks";
import { NetworkDetails, networks } from "../constants/chain";
import { TimerResult, useTimer } from "react-timer-hook";
import { useWeb3Provider } from "./useWeb3Provider";
import { useCohortContract, useTokenContract } from "./useContract";
import { useFarms } from "../store/farms/hooks";
//import { useDeriveUserStakes } from "../store/stakes/hooks";
//import { useClaims } from "../store/claims/hooks";
//import { StakeTabPosition } from "../store/user/reducer";
import { DataType } from "../contexts/ScreenContext";
import {
  /* computeStakeRewards ,*/ isEmpty,
  unitFormatter,
} from "../utilities";
//import { useBlockTimeStamp } from "./useMultiCall";
//import { useTokenlist } from "../store/lists/hooks";
//import { TokenMetaData } from "../store/lists/reducer";
import { excludeBlockedFarms } from "../utilities/farms";
import { useDeriveStakes } from "../store/stakes/hooks";

export const useProxyAddress = (cohortId: string): string => {
  const cohorts = useAppCohorts();
  return useMemo(() => {
    if (_.isEmpty(cohorts)) return null;
    const cohort = cohorts.filter((e) => {
      return e.cohortAddress.toLowerCase() === cohortId.toLowerCase();
    });
    if (_.isEmpty(cohort[0].proxies)) return cohortId;
    return cohort[0].proxies[cohort[0].proxies.length - 1];
  }, [cohorts, cohortId]);
};

export const useActiveNetwork = (): NetworkDetails => {
  const { appChainId } = useApplicationUserState();
  return useMemo(() => {
    return networks[appChainId];
  }, [appChainId]);
};

export const useEndTime = (startTime: number, duration: number): number => {
  return useMemo(() => {
    return _.multiply(_.add(startTime, duration), 1000);
  }, [startTime, duration]);
};

export const useCountDown = (endTime: any): TimerResult => {
  const timer = useTimer({
    expiryTimestamp: endTime,
    onExpire: () => null,
  });
  return timer;
};

export const useUserTokenBalance = (tokenId: string, decimals: number) => {
  const { account } = useWeb3Provider();
  const [balance, setBalance] = useState<number | null>();
  console.log("tokenId:",tokenId)
  const instance = useTokenContract(tokenId);

  useEffect(() => {
    if (!instance || !tokenId || !account || !decimals) return null;
    instance
      .balanceOf(account)
      .then((userBalance) => {
        setBalance(unitFormatter(userBalance, decimals));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [tokenId, instance, account, decimals]);

  return balance;
};

export const useUserStakingBalance = (
  cohortId: string,
  tokenId: string,
  decimals: number
): number => {
  const { account } = useWeb3Provider();

  const [userStaking, setUserStaking] = useState<number | null>();

  const instance = useCohortContract(cohortId);

  useEffect(() => {
    if (!instance || !tokenId || !cohortId || !account) return null;
    instance
      .userTotalStaking(account, tokenId)
      .then((userStakingBalance) => {
        setUserStaking(unitFormatter(userStakingBalance, decimals));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [cohortId, tokenId, instance, account, decimals]);

  return userStaking;
};

export const useSearchQuery = (): [string, (query: string) => void] => {
  const [search, setSearchQuery] = useState<string>("");

  const searchQueryHandler = useCallback((query: string) => {
    return setSearchQuery(query);
  }, []);
  return [search, searchQueryHandler];
};

export const usePoolFilter = (): DataType => {
  const { farms } = useFarms();
  const { searchKey } = useActionScreenType();
  return useMemo(() => {
    if (_.isEmpty(farms) || !searchKey) return null;
    const farm = farms.filter((e) => {
      return e.__fid.toLowerCase() === searchKey.toLowerCase();
    })[0];

    return {
      farm,
      stakeDetails: null,
    };
  }, [farms, searchKey]);
};

/* export const useStakes = () => {
  const { stakes } = useDeriveUserStakes();
  const { claims } = useClaims();

  const { myStakeTabPosition } = useApplicationUserState();
  if (myStakeTabPosition === StakeTabPosition.STAKE) {
    return stakes;
  } else if (myStakeTabPosition === StakeTabPosition.CLAIM) {
    return claims;
  }
  return null;
}; */

export const useData = (): DataType | null => {
  const { searchKey } = useActionScreenType();

  const { stakesOrClaims } = useDeriveStakes();

  return useMemo(() => {
    if (!searchKey) return null;
    const stakeDetails = stakesOrClaims.filter((e) => {
      return e.__fid.toLowerCase() === searchKey.toLowerCase();
    });
    if (isEmpty(stakeDetails)) return null;
    const stake = stakeDetails[0];
    return {
      farm: stake,
      stakeDetails: {
        stakeId: stake.stakeId,
        stakedAmount: stake.stakedAmount,
        APY: stake.APY,
        time: stake.time,
        rewards: stake.rewards,
        transactionHash: stake.transactionHash,
      },
    };
  }, [stakesOrClaims, searchKey]);
};

/* export const useStakeRewards = (
  intervalDays: string[],
  tokenDailyDistribution: string[],
  tokenSequence: string[],
  poolStartTime: number,
  stakeDuration: number,
  startTime: number,
  rewardStrategy: string,
  isReferBy: boolean,
  refPercentage: number
) => {
  const timestamp = useBlockTimeStamp();

  const tokenlist = useTokenlist();

  return useMemo(() => {
    if (
      !tokenlist ||
      _.isEmpty(tokenlist) ||
      _.isEmpty(intervalDays) ||
      _.isEmpty(tokenDailyDistribution) ||
      _.isEmpty(tokenSequence) ||
      !poolStartTime ||
      !stakeDuration ||
      !startTime ||
      !rewardStrategy ||
      !isReferBy ||
      !refPercentage
    )
      return null;

    const hourly = rewardStrategy === "hourly";
    var endOfProfit: number;
    const endTime = _.add(poolStartTime, stakeDuration);
    if (timestamp > endTime) {
      endOfProfit = endTime;
    } else {
      endOfProfit = timestamp;
    }
    var dayStaked: number;
    if (hourly) {
      dayStaked = _.divide(_.subtract(endOfProfit, startTime), 3600);
    } else {
      dayStaked = _.divide(_.subtract(endOfProfit, startTime), 86400);
    }

    const tokenSpecs: TokenMetaData[] = tokenSequence.map((address) => {
      const token = tokenlist.filter((e) => {
        return e.address.toLowerCase() === address.toLowerCase();
      })[0];
      return token;
    });

    const expectedRewards = computeStakeRewards(
      tokenSpecs,
      intervalDays,
      tokenDailyDistribution,
      dayStaked,
      hourly,
      isReferBy,
      refPercentage
    );
    return expectedRewards;
  }, [
    intervalDays,
    tokenDailyDistribution,
    tokenSequence,
    poolStartTime,
    stakeDuration,
    startTime,
    rewardStrategy,
    isReferBy,
    refPercentage,
    timestamp,
    tokenlist,
  ]);
}; */

export const useExcludedFarms = () => {
  const { farms } = useFarms();
  return useMemo(() => {
    if (isEmpty(farms)) return null;
    const excludedFarms = excludeBlockedFarms(farms);
    return excludedFarms;
  }, [farms]);
};
