import { isEmpty, includes } from "lodash";
import {
  computeStakeRewards,
  deserializePools,
  getApy,
  getBlock,
  getOneDayRewards,
  getProxyInstance,
  getProxyUnstakeStatus,
  /* getQuatersInOneYear */
  unitFormatter,
} from ".";
import { AllCohort } from "../store/application/reducer";
import { TokenMetaData } from "../store/lists/reducer";
import { Promise } from "bluebird";
import { DEFAULT_REFFERAL_ADDRESS, STARTFI_SPECIAL, YEAR } from "../constants";
import { getSpecficPools } from "./resolvers";
import { FarmResponse, getFarms } from "./farms";
import { divide } from "lodash";
import { add } from "lodash";
import { subtract } from "lodash";
import { multiply } from "lodash";
import { StakeDetails } from "../store/stakes/reducer";
import randomString from "randomstring";
import {
  getTotalStakingMultiCall,
  getUserStakingsMulticall,
} from "./multicall";

interface CommanInterfaceForStakes {
  cohortId: string;
  tokenId: string;
  stakedAmount: string;
  startTime: number;
  referralAddress: string | null;
  stakeId: number;
  proxies: string[];
}

interface FarmWithStakes extends CommanInterfaceForStakes {
  farmResponse: FarmResponse;
}

const getStakeReward = (farmStakeItems: FarmWithStakes, now: number) => {
  if (isEmpty(farmStakeItems) || !now) return null;
  const { farmResponse, startTime, referralAddress, stakedAmount } =
    farmStakeItems;

  const {
    rewardSequence,
    cohortDetails,
    tokenDetails,
    totalStaking,
    farmDetails,
  } = farmResponse;

  const intervalDays = cohortDetails.intervalDays;
  const tokenDailyDistribution = tokenDetails.tokenDailyDistribution;
  const rewardStrategy = cohortDetails.rewardStrategy;
  const poolStartTime = cohortDetails.poolStartTime;
  const stakeDuration = cohortDetails.stakeDuration;
  const isReferBy = referralAddress?.toLowerCase() !== DEFAULT_REFFERAL_ADDRESS;

  const hourly = rewardStrategy === "hourly";

  var endOfProfit: number;
  const endTime = add(poolStartTime, stakeDuration);

  if (now > endTime) {
    endOfProfit = endTime;
  } else {
    endOfProfit = now;
  }

  var dayStaked: number;
  if (hourly) {
    dayStaked = ~~divide(subtract(endOfProfit, startTime), 3600);
  } else {
    dayStaked = ~~divide(subtract(endOfProfit, startTime), 86400);
  }

  const parseStakedAmount = unitFormatter(stakedAmount, farmDetails.decimals);

  const dayRewards = getOneDayRewards(
    parseStakedAmount,
    cohortDetails.cohortId.toLowerCase() === STARTFI_SPECIAL.toLowerCase()
      ? tokenDetails.totalStakeLimit
      : totalStaking,
    tokenDailyDistribution,
    rewardSequence
  );

  const stakeReward = computeStakeRewards(
    rewardSequence,
    intervalDays,
    dayRewards,
    dayStaked,
    hourly,
    isReferBy,
    cohortDetails.refferalPercentage
  );
  return { stakeReward, dayStaked };
};

export const unStakeStatusProxy = async (
  chainId: number,
  proxies: string[],
  account: string,
  stakeId: number
): Promise<boolean> => {
  if (isEmpty(proxies)) return false;
  var unstakeStatusPromise = [];
  for (var g = 0; g < proxies.length; g++) {
    const proxyAddress = proxies[g];
    const proxyInstance = getProxyInstance(proxyAddress);
    const unStakeStatus = getProxyUnstakeStatus(
      chainId,
      proxyInstance,
      account,
      stakeId
    );
    unstakeStatusPromise.push(unStakeStatus);
  }
  const unStakeStatusForAllProxies = await Promise.map(
    unstakeStatusPromise,
    (values) => {
      return values;
    }
  );
  return includes(unStakeStatusForAllProxies, true);
};

export const getActiveStakingDetails = async (
  chainId: number,
  cohorts: AllCohort[],
  tokenlist: TokenMetaData[],
  account: string
) => {
  if (isEmpty(cohorts) || isEmpty(tokenlist)) return null;
  try {
    var stakes = [] as StakeDetails[];

    var userActualActiveStakes = await getUserStakingsMulticall(
      chainId,
      cohorts,
      account
    );

    const cohortAddresses = userActualActiveStakes.map(
      (items) => items.cohortId
    );

    const tokenAddresses = userActualActiveStakes.map((items) => items.tokenId);

    const specificFarms = await getSpecficPools(
      chainId,
      cohortAddresses,
      tokenAddresses
    );

    const deserializedPools = deserializePools(specificFarms);

    var relatedFarms: FarmResponse[] = [];

    // totalStaking derivation
    const totalStakings = await getTotalStakingMultiCall(
      chainId,
      deserializedPools
    );

    for (var f = 0; f < deserializedPools.length; f++) {
      const farm = deserializedPools[f];
      relatedFarms.push(getFarms(farm, tokenlist, chainId, totalStakings[f]));
    }

    var farmsWithStakes = [] as FarmWithStakes[];

    for (var k = 0; k < userActualActiveStakes.length; k++) {
      const actualActiveStake = userActualActiveStakes[k];

      const farm = relatedFarms.filter((e) => {
        return (
          e.cohortDetails.cohortId.toLowerCase() ===
            actualActiveStake.cohortId.toLowerCase() &&
          e.tokenDetails.tokenId.toLowerCase() ===
            actualActiveStake.tokenId.toLowerCase()
        );
      });

      farmsWithStakes.push({
        farmResponse: farm[0],
        ...actualActiveStake,
      });
    }

    const block = await getBlock();

    for (var t = 0; t < farmsWithStakes.length; t++) {
      const farmStakeItems = farmsWithStakes[t];
      const { stakedAmount, farmResponse, stakeId, startTime } = farmStakeItems;
      const { farmDetails /* cohortDetails */ } = farmResponse;

      const parseStakedAmount = unitFormatter(
        stakedAmount,
        farmDetails.decimals
      );

      const stakedAmountInUSD: number = multiply(
        parseStakedAmount,
        farmDetails?.price
      );
      //const stakeDuration = cohortDetails.stakeDuration / 86400;

      const { stakeReward, dayStaked } = getStakeReward(
        farmStakeItems,
        block.timestamp
      );

      const quater = (24 / dayStaked) * YEAR;

      const APY = getApy(
        stakeReward.accumulatedRewardInUSD,
        stakedAmountInUSD,
        quater
      );

      stakes.push({
        ...farmResponse,
        __fid: randomString.generate(12),
        stakeId,
        stakedAmount: parseStakedAmount,
        time: startTime,
        APY,
        rewards: stakeReward.rewards,
        transactionHash: null,
      });
    }

    return stakes;
  } catch (err) {
    console.log(`errored ${err}`);
  }
};
