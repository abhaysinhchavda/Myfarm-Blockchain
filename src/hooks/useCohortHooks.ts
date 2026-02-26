import { useMemo } from "react";
import { useTokenlist } from "../store/lists/hooks";
import { TokenMetaData } from "../store/lists/reducer";
import _ from "lodash";
import {
  getAPYLimit,
  getOneDayReward,
  getTotalStaking,
  RewardToken,
  unitFormatter,
} from "../utilities";
import { useAsyncMemo } from "use-async-memo";
import { useCohortContract } from "./useContract";
import { useDeriveStakeInputAmount } from "../store/application/hooks";
import { useDebounce } from "use-debounce";
import { useApplicationUserState } from "../store/user/hooks";
import { StakeTabPosition } from "../store/user/reducer";
//import { useProxyAddress } from "./useMiscellaneous";

export const MAX_TOKENS_REWARDS = 3;

export const useTokenSorting = (token: string): TokenMetaData => {
  const tokenlist = useTokenlist();
  return useMemo(() => {
    if (!tokenlist || !token) return null;
    const tokenMetaData = tokenlist.filter((e) => {
      return e.address.toLowerCase() === token.toLowerCase();
    });
    if (!tokenMetaData || _.isEmpty(tokenMetaData)) return null;
    return tokenMetaData[0];
  }, [token, tokenlist]);
};

export const useFarmsRewardTokens = (sequence: string[]): TokenMetaData[] => {
  const tokenlist = useTokenlist();

  return useMemo(() => {
    if (_.isEmpty(tokenlist) || _.isEmpty(sequence)) return null;
    return sequence.map((address) => {
      return tokenlist.filter((e) => {
        return address.toLowerCase() === e.address.toLowerCase();
      })[0];
    });
  }, [sequence, tokenlist]);
};

export const useTotalStaking = (
  cohortId: string,
  tokenId: string,
  decimals: number
) => {
  //const proxyAddress = useProxyAddress(cohortId);
  const cohort = useCohortContract(cohortId);
  return useAsyncMemo(async () => {
    if (!cohort || !tokenId || !decimals) return null;
    const totalStaking = await getTotalStaking(cohort, tokenId, false);
    return unitFormatter(String(totalStaking), decimals);
  }, [cohort, cohortId, tokenId, decimals]);
};

export const useTokenSequenceWithRewards = (
  totalStaking: number,
  sequence: string[],
  perDayRewards: string[],
  intervalDays: string[],
  stakeDuration: number
): RewardToken[] => {
  const stakeInputAmount = useDeriveStakeInputAmount();

  const [stakeAmount] = useDebounce(stakeInputAmount, 3000);

  const tokenlist = useTokenlist();
  return useMemo(() => {
    if (_.isEmpty(sequence) || _.isEmpty(tokenlist)) return null;
    const rewardTokens: TokenMetaData[] = [];
    for (var z = 0; z < sequence.length; z++) {
      const tokenFilter = tokenlist.filter((e) => {
        return e.address.toLowerCase() === sequence[z].toLowerCase();
      });
      rewardTokens.push(tokenFilter[0]);
    }
    const rewards = getOneDayReward(
      rewardTokens,
      stakeAmount,
      perDayRewards,
      totalStaking,
      intervalDays,
      Number(stakeDuration)
    );
    return rewards;
  }, [
    stakeAmount,
    totalStaking,
    sequence,
    perDayRewards,
    intervalDays,
    stakeDuration,
    tokenlist,
  ]);
};

export const useApy = (
  action: "STAKE" | "UNSTAKE",
  aggreatedAPY: number,
  apyRange: number[]
) => {
  const { myStakeTabPosition } = useApplicationUserState();
  return useMemo(() => {
    if (aggreatedAPY === null || !apyRange) return null;
    if (
      action === "STAKE" ||
      (action === "UNSTAKE" && myStakeTabPosition === StakeTabPosition.STAKE)
    ) {
      const apy = getAPYLimit(aggreatedAPY, apyRange);
      return apy;
    }
    return aggreatedAPY;
  }, [aggreatedAPY, apyRange, action, myStakeTabPosition]);
};

export const useCalculatePoolFilled = (
  totalStaking: number,
  poolMaxStake: number
): number => {
  return useMemo(() => {
    if (!totalStaking || !poolMaxStake) return null;
    return _.divide(totalStaking, poolMaxStake) * 100;
  }, [totalStaking, poolMaxStake]);
};
