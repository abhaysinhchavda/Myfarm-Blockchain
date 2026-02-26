import { BigNumber, ethers } from 'ethers';
import { isEmpty, divide, multiply, subtract, sum, add } from 'lodash';
import { roundValue, unitFormatter } from '..';
import { TokenMetaData } from '../../store/lists/reducer';
import { Farm, FarmData } from '../../store/V2/farms/reducer';

export const getTotalStakingUsd = (
  totalStaking: number,
  farmTokenPrice: number
): number => {
  return multiply(totalStaking, farmTokenPrice);
};

export const getBlockDiffrence = (to: number, from: number): number => {
  return subtract(to, from);
};

export const getStartCheckpoint = (
  startBlock: number,
  endBlock: number,
  checkpointBlocks: number
): number => {
  return roundValue(divide(getBlockDiffrence(endBlock, startBlock), checkpointBlocks), 0);
};

export const getEndCheckpoint = (
  startBlock: number,
  endBlock: number,
  checkpointBlocks: number,
  cEndBlock: number
): number => {
  if (endBlock > cEndBlock) {
    endBlock = cEndBlock;
  }
  return roundValue(divide(getBlockDiffrence(endBlock, startBlock), checkpointBlocks), 0);
};

export const getYF2Rewards = (
  rewards: TokenMetaData[],
  pbr: number[],
  epochBlocks: number,
  userStakedBlock: number,
  startCheckpoint: number,
  currentCheckpoint: number,
  stakedAmount: number,
  isBoosted: boolean,
  totalStakeLimit?: number,
  priorCheckpointTVLs?: number[]
): [{ [rewardToken: string]: number }[], number] | [] => {
  // validate
  if (rewards.length !== pbr.length) return [];

  let calcaulatedRewards = [] as { [rewardToken: string]: number }[];

  // start checkpoint
  let k = startCheckpoint;

  // push all the r values
  let rValues = [] as number[];

  // calculate aggregated reward value
  while (k < currentCheckpoint) {
    let eligibleBlocks: number = epochBlocks;
    const nextCheckpoint = multiply(add(startCheckpoint, 1), epochBlocks);
    if (userStakedBlock > nextCheckpoint) {
      eligibleBlocks = subtract(userStakedBlock, nextCheckpoint);
    }
    if (isBoosted) {
      rValues.push(
        multiply(divide(stakedAmount, priorCheckpointTVLs[k]), eligibleBlocks)
      );
    } else {
      rValues.push(multiply(divide(stakedAmount, totalStakeLimit), eligibleBlocks));
    }
    k++;
  }

  const rValue = sum(rValues);

  // sum up the reward token
  let usdAmounts = [] as number[];

  for (var t = 0; t < rewards.length; t++) {
    let rAmount = multiply(rValue, pbr[t]);
    let reward = {} as { [rewardToken: string]: number };
    let { address, price } = rewards[t];
    reward[address] = rAmount;
    calcaulatedRewards.push(reward);
    usdAmounts.push(multiply(rAmount, price));
  }

  return [calcaulatedRewards, sum(usdAmounts)];
};

// this is non boosted APY

interface UserPublicData {
  /** start checkpoint */
  startCheckpoint: number;
  /** end checkpoint */
  endCheckpoint: number;
  /** stakedAmount */
  stakedAmount: number;
  /** stakedAmount in USD */
  stakedAmountInUSD: number;
  /** user staked block */
  userStakedBlock: number;
}

interface APYParam {
  /** reward token address */
  rewards: TokenMetaData[];
  /** per block rewards */
  pbr: number[];
  /** epoch blocks */
  epochBlocks: number;
  /** total stake limit */
  totalStakeLimit: number;
  /** prior epoch tvls */
  priorEpochATvls: number[];
  /** user staked block */
  userPublicData: UserPublicData;
}

export const getApy = (args: APYParam): number => {
  if (isEmpty(args)) return null;
  const [, earnedUsd] = getYF2Rewards(
    args.rewards,
    args.pbr,
    args.epochBlocks,
    args.userPublicData.userStakedBlock,
    args.userPublicData.startCheckpoint,
    args.userPublicData.endCheckpoint,
    args.userPublicData.stakedAmount,
    false,
    args.totalStakeLimit,
    args.priorEpochATvls
  );
  return divide(args.userPublicData.stakedAmountInUSD, earnedUsd);
};

export const getBoostedAPY = (args: APYParam): number => {
  if (isEmpty(args)) return null;
  const [, earnedUsd] = getYF2Rewards(
    args.rewards,
    args.pbr,
    args.epochBlocks,
    args.userPublicData.userStakedBlock,
    args.userPublicData.startCheckpoint,
    args.userPublicData.endCheckpoint,
    args.userPublicData.stakedAmount,
    true,
    args.totalStakeLimit,
    args.priorEpochATvls
  );
  return divide(args.userPublicData.stakedAmountInUSD, earnedUsd);
};

export const decodeRewardTokens = (rewards: string): [string[], BigNumber[]] => {
  return ethers.utils.defaultAbiCoder.decode(['address[]', 'uint256[]'], rewards) as [
    string[],
    BigNumber[]
  ];
};

export const getRewardTokensMetaData = (
  tokenlist: TokenMetaData[],
  rewards: string[],
  pbrs: BigNumber[]
): [TokenMetaData[], number[]] => {
  let rewardTokens = [] as TokenMetaData[];
  let parsedPbrs = [] as number[];
  for (var q = 0; q < rewards.length; q++) {
    const filterTokens = tokenlist.filter((e) => {
      return e.address.toLowerCase() === rewards[q].toLowerCase();
    });
    if (isEmpty(filterTokens)) return null;
    rewardTokens.push(filterTokens[0]);
    parsedPbrs.push(unitFormatter(pbrs[q], filterTokens[0].decimals));
  }
  return [rewardTokens, parsedPbrs];
};

export const formatFarmPublicData = (
  farm: Farm,
  totalStaking: BigNumber,
  priorEpochATVls: BigNumber[],
  tokenlist: TokenMetaData[],
  userStakedAmount: number
): FarmData => {
  const { cohort, token, farmDetails } = farm;
  const activeStaking = unitFormatter(totalStaking, parseFloat(token.decimals));

  let parsedPriorATotalStaking = [] as number[];
  if (!isEmpty(priorEpochATVls)) {
    let k = 0;
    while (k < priorEpochATVls.length) {
      parsedPriorATotalStaking.push(
        unitFormatter(priorEpochATVls[k], parseFloat(token.decimals))
      );
      k++;
    }
  }
  const [rewardTokenAddress, pbrs] = decodeRewardTokens(cohort.rewards);
  const [rewardTokensMetaData, parsedPbrs] = getRewardTokensMetaData(
    tokenlist,
    rewardTokenAddress,
    pbrs
  );

  return {
    activeStaking,
    priorEpochTvls: parsedPriorATotalStaking,
    APY: 36,
    rewards: rewardTokensMetaData,
    boosterAPY: 250,
    usdTotalStaking: getTotalStakingUsd(userStakedAmount, farmDetails?.farmTokenPrice),
    poolFilled: multiply(activeStaking / token.totalStakeLimit, 100),
    rewardTokenAddress,
    perBlockRewards: parsedPbrs,
  };
};
