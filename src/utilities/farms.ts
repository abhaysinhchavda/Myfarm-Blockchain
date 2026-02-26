import {
  getAPYRange,
  getGroupTokenInformation,
  getLatestProxyAddress,
  getTokenInformationByAddress,
  isEmpty,
  unitFormatter,
  DeseriallizedPool,
  RewardToken,
} from ".";
import { blockedPools, hotpools } from "../constants";
import { TokenMetaData } from "../store/lists/reducer";
import _ from "lodash";
import { Farm } from "../store/farms/reducer";
import { Token, Cohort } from "../store/farms/types";
import randomString from "randomstring";

export const isHotpoolOrNormal = (
  chainId: number,
  tokenId: string,
  cohortId: string
): boolean => {
  const filterHotpool = hotpools.filter((e) => {
    return (
      e.chainId === chainId &&
      e.tokenId.toLowerCase() === tokenId.toLowerCase() &&
      e.cohortId.toLowerCase() === cohortId.toLowerCase()
    );
  });
  if (isEmpty(filterHotpool)) return false;
  return true;
};

export const excludeBlockedFarms = (farms: Farm[]) => {
  var newFarmsArray: Farm[] = [];
  for (var e = 0; e < farms.length; e++) {
    const tokenId = farms[e].tokenDetails.tokenId;
    const searchBlockPool = blockedPools.filter((e) => {
      return e.toLowerCase() === tokenId.toLowerCase();
    });
    if (isEmpty(searchBlockPool)) {
      newFarmsArray.push(farms[e]);
    }
  }
  return newFarmsArray;
};

export interface FarmResponse {
  __fid: string;
  farmDetails: TokenMetaData;
  tokenDetails: Token;
  cohortDetails: Cohort;
  totalStaking: number;
  poolFilled: number;
  apyRange: number[];
  rewardSequence: RewardToken[];
  locking: number;
  isHotpool: boolean;
  proxyAddress: string | null;
  farmEndTime: number;
}

export const getFarms = (
  farms: DeseriallizedPool,
  tokenlist: TokenMetaData[],
  chainId: number,
  totalStaking?: string
): FarmResponse => {
  if (isEmpty(farms) || isEmpty(tokenlist)) return null;
  const { token, cohort } = farms;
  const {
    tokenId,
    decimals,
    tokenSequenceList,
    totalStakeLimit,
    lockableDays,
  } = token;

  const { stakeDuration, poolStartTime, cohortId, proxies } = cohort;

  const farmDetails = getTokenInformationByAddress(tokenId, tokenlist);

  const proxyAddress = getLatestProxyAddress(proxies);

  const parsedTotalStaking = unitFormatter(totalStaking, decimals);

  const farmEndTime = _.add(Number(poolStartTime), Number(stakeDuration));

  const rewardSequence = getGroupTokenInformation(tokenSequenceList, tokenlist);

  const poolFilled = (parsedTotalStaking / totalStakeLimit) * 100;

  const apyRange = getAPYRange(chainId, cohortId);

  const locking = Number(lockableDays) > 0 ? stakeDuration / 86400 : 0;

  const isHotpool = isHotpoolOrNormal(chainId, tokenId, cohortId);

  return {
    __fid: randomString.generate(12),
    farmDetails,
    tokenDetails: token,
    cohortDetails: cohort,
    totalStaking: parsedTotalStaking,
    poolFilled,
    apyRange,
    rewardSequence,
    locking,
    isHotpool,
    proxyAddress,
    farmEndTime,
  };
};
