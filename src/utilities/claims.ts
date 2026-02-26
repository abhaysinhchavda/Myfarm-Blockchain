import _ from 'lodash';
import {
  deserializePools,
  getApy,
  getQuatersInOneYear,
  RewardToken,
  unitFormatter,
} from '.';
import { client } from '../graphql';
import { AllClaim, Claims, Unstakes } from '../graphql/queries';
import { GET_ALL_CLAIMS } from '../graphql/queries';
import { TokenMetaData } from '../store/lists/reducer';
import { FarmResponse, getFarms } from './farms';
import { getSpecficPools } from './resolvers';
import { Promise } from 'bluebird';
import { StakeDetails } from '../store/stakes/reducer';
import { blockedFarms } from '../constants/blockedFarms';
import { isEmpty } from 'lodash';
import { AllCohort } from '../store/application/reducer';
import randomString from 'randomstring';
import { getTotalStakingMultiCall } from './multicall';

interface AllClaimResponse {
  unstakes: Unstakes[];
  claims: Claims[];
}

export const getActualUnstakes = (
  chainId: number,
  unstakes: Unstakes[],
  appCohorts: AllCohort[]
): Unstakes[] => {
  var actualUnstakes = [] as Unstakes[];

  for (var e = 0; e < unstakes.length; e++) {
    var unStakeItems = unstakes[e];
    const cohortId = unStakeItems.cohortId;
    const tokenId = unStakeItems.unStakedTokenAddress;

    const isProxy = appCohorts.filter((e) => {
      return e.proxies?.includes(cohortId.toLowerCase());
    });

    if (!isEmpty(isProxy)) {
      unStakeItems = { ...unStakeItems, cohortId: isProxy[0].cohortAddress };
    }

    const isBlocked = blockedFarms[chainId]?.filter((e) => {
      return e.newAddress.toLowerCase() === tokenId.toLowerCase();
    });

    if (!isEmpty(isBlocked)) {
      unStakeItems = {
        ...unStakeItems,
        unStakedTokenAddress: isBlocked[0].legacyAddress,
      };
    }

    actualUnstakes.push(unStakeItems);
  }
  return actualUnstakes;
};

export const getAllClaims = async (
  chainId: number,
  userAddress: string
): Promise<AllClaimResponse | null> => {
  if (!chainId || !userAddress) return null;
  const claims = await client.query<AllClaim>({
    query: GET_ALL_CLAIMS,
    variables: {
      where: {
        chainId,
        userAddress,
      },
      getAllClaimsByUserWhere2: {
        chainId,
        userAddress,
      },
    },
  });

  if (_.isEmpty(claims)) return null;
  return {
    unstakes: claims.data.getAllUnstakes,
    claims: claims.data.getAllClaimsByUser,
  };
};

export const getClaimHistory = async (
  chainId: number,
  account: string,
  tokenlist: TokenMetaData[],
  appCohorts: AllCohort[]
) => {
  const allClaims = await getAllClaims(chainId, account);
  const unstakes = allClaims.unstakes;
  const claimRewards = allClaims.claims;

  if (_.isEmpty(unstakes)) {
    // do some thing for no claim found.
    return [];
  }

  const actualUnstakes = getActualUnstakes(chainId, unstakes, appCohorts);

  const cohortAddresses = actualUnstakes.map((items) => {
    return items.cohortId;
  });

  const tokenAddresses = actualUnstakes.map((items) => {
    return items.unStakedTokenAddress;
  });

  const specificFarms = await getSpecficPools(
    chainId,
    cohortAddresses,
    tokenAddresses
  );

  const deserializedPools = deserializePools(specificFarms);

  if (isEmpty(deserializedPools)) return null;

  var farmResponse = [] as FarmResponse[];

  const totalStakings = await getTotalStakingMultiCall(
    chainId,
    deserializedPools
  );

  for (var d = 0; d < deserializedPools.length; d++) {
    const deserializeFarmItems = deserializedPools[d];
    farmResponse.push(
      getFarms(deserializeFarmItems, tokenlist, chainId, totalStakings[d])
    );
  }

  const claims: StakeDetails[] = actualUnstakes.map((items) => {
    const cohortId = items.cohortId;
    const tokenId = items.unStakedTokenAddress;

    const farm = farmResponse.filter((e) => {
      return (
        e.cohortDetails.cohortId.toLowerCase() === cohortId.toLowerCase() &&
        e.tokenDetails.tokenId.toLowerCase() === tokenId.toLowerCase()
      );
    })[0];

    const decimals = Number(farm?.farmDetails?.decimals);

    const rewardSequence = farm?.rewardSequence;

    const claimsBytransactionHash = claimRewards?.filter((e) => {
      return items.hash.toLowerCase() === e.hash.toLowerCase();
    });

    var tokenMetaDataWithClaimRewards = [] as RewardToken[];
    var claimedRewards = [] as number[];

    for (var c = 0; c < rewardSequence?.length; c++) {
      const rewardTokenAddress = claimsBytransactionHash[c]?.rewardTokenAddress;

      const rewardToken = rewardSequence[c];

      const exactMatch = tokenlist?.filter((e) => {
        return e?.address?.toLowerCase() === rewardTokenAddress?.toLowerCase();
      });

      var claimedReward: number;

      if (isEmpty(exactMatch)) {
        claimedReward = 0;
      } else {
        const rewardTokenDecimals = exactMatch[0]?.decimals;

        const exactReward = claimsBytransactionHash.filter((e) => {
          return (
            e?.rewardTokenAddress?.toLowerCase() ===
            rewardToken?.address?.toLowerCase()
          );
        });

        claimedReward = unitFormatter(
          exactReward[0]?.claimedRewards,
          rewardTokenDecimals
        );
      }

      tokenMetaDataWithClaimRewards.push({
        ...rewardToken,
        reward: claimedReward,
      });

      claimedRewards.push(_.multiply(claimedReward, rewardSequence[c]?.price));
    }

    const stakedAmount = unitFormatter(
      items.unStakedAmount,
      decimals ? decimals : 18
    );

    const rewardsEranedUsd = _.sum(claimedRewards);
    const stakedAmountInUsd = _.multiply(
      stakedAmount,
      farm?.farmDetails?.price
    );
    const quaters = getQuatersInOneYear(
      farm?.cohortDetails?.stakeDuration / 86400
    );

    const apy = getApy(rewardsEranedUsd, stakedAmountInUsd, quaters);

    return {
      ...farm,
      __fid: randomString.generate(12),
      stakeId: Number(items.stakeId) as number,
      stakedAmount,
      APY: apy,
      time: Number(items.time) as number,
      rewards: tokenMetaDataWithClaimRewards,
      transactionHash: items.hash,
    };
  });

  return claims;
};
