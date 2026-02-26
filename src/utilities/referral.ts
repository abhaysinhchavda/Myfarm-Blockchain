import { deserializePools, isEmpty, RewardToken, unitFormatter } from ".";
import { Unstakes } from "../graphql/queries";
import { TokenMetaData } from "../store/lists/reducer";
import { FarmResponse, getFarms } from "./farms";
import {
  getReferedUsers,
  getSpecficPools,
  getSpecificUnstakes,
} from "./resolvers";
import { Promise } from "bluebird";
import { Referral } from "../store/referral/reducer";
import { getTotalStakingMultiCall } from "./multicall";

export const getReferrals = async (
  chainId: number,
  tokenlist: TokenMetaData[],
  account: string
): Promise<Referral[]> => {
  const referrals = await getReferedUsers(chainId, account);

  const referralUsers = referrals.getAllTheReferedUser;
  const referralClaims = referrals.getReferralClaimByUser;
  if (isEmpty(referralUsers)) {
    return [];
  }
  const userAddresses = referralUsers.map((items) => items.referrerAddress);
  const specficReferedFarms = await getSpecificUnstakes(chainId, userAddresses);

  if (isEmpty(specficReferedFarms)) {
    return [];
  }

  var actualUnStakedReferedUsers = [] as Unstakes[];
  for (var r = 0; r < referralUsers.length; r++) {
    const referedUserItems = referralUsers[r];
    const unStakedReferUser = specficReferedFarms.getSpecficUnstakes.filter(
      (e) => {
        return (
          Number(e.stakeId) === Number(referedUserItems.stakeId) &&
          e.userAddress.toLowerCase() ===
            referedUserItems.referrerAddress.toLowerCase()
        );
      }
    );
    if (!isEmpty(unStakedReferUser)) {
      actualUnStakedReferedUsers.push(unStakedReferUser[0]);
    }
  }

  const cohortAddresses = actualUnStakedReferedUsers.map(
    (items) => items.cohortId
  );

  const tokenAddresses = actualUnStakedReferedUsers.map(
    (items) => items.unStakedTokenAddress
  );
  const specficFarms = await getSpecficPools(
    chainId,
    cohortAddresses,
    tokenAddresses
  );
  const deserialize = deserializePools(specficFarms);
  const totalStakings = await getTotalStakingMultiCall(chainId, deserialize);

  var referralUserFarms = [] as FarmResponse[];
  for (var e = 0; e < deserialize.length; e++) {
    referralUserFarms.push(
      getFarms(deserialize[e], tokenlist, chainId, totalStakings[e])
    );
  }

  var referral = [] as Referral[];
  for (var v = 0; v < actualUnStakedReferedUsers.length; v++) {
    const actualUnstakedReferUserItems = actualUnStakedReferedUsers[v];
    const farm = referralUserFarms.filter((e) => {
      return (
        (e.cohortDetails.cohortId.toLowerCase() ===
          actualUnstakedReferUserItems.cohortId.toLowerCase() ||
          e.cohortDetails.proxies?.includes(
            actualUnstakedReferUserItems.cohortId.toLowerCase()
          )) &&
        e.tokenDetails.tokenId.toLowerCase() ===
          actualUnstakedReferUserItems.unStakedTokenAddress.toLowerCase()
      );
    })[0];

    const referralRewards = referralClaims.filter((e) => {
      return (
        e.hash.toLowerCase() === actualUnstakedReferUserItems.hash.toLowerCase()
      );
    });

    const rewards: RewardToken[] = referralRewards?.map((reward, i) => {
      const rewardSequence = farm.rewardSequence;
      const claimedReward =
        reward === undefined
          ? 0
          : unitFormatter(reward.rewardAmount, rewardSequence[i].decimals);
      return {
        ...rewardSequence[i],
        reward: claimedReward,
      };
    });

    referral.push({
      ...farm,
      APY: null,
      referralRewards: rewards,
      referedUserAddress: actualUnstakedReferUserItems.userAddress,
      transactionHash: actualUnstakedReferUserItems.hash,
      claimedOn: Number(actualUnstakedReferUserItems.time) as number,
    });
  }

  return referral;
};
