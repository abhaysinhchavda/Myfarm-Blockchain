import { gql } from "@apollo/client";

interface TokenDetails {
  tokenId: string;
  decimals: string;
  userMinStake: string;
  userMaxStake: string;
  totalStakeLimit: string;
  lockableDays: string;
  tokenSequenceList: string[];
  tokenDailyDistribution: string[];
}

interface CohortDetails {
  cohortAddress: string;
  stakeDuration: string;
  poolStartTime: string;
  intervalDays: string[];
  refferalPercentage: string;
  cohortVersion: string;
  rewardStrategy: string;
  tokens: string[];
  gaslessAvailablity: boolean;
  tag: string;
  proxies: string[];
}

export interface AllPools {
  token: TokenDetails;
  cohort: CohortDetails;
}

export interface AllPoolsQueryResponse {
  allPools: {
    pools: AllPools[];
    total_pools: number;
  };
}

export interface Unstakes {
  id: string;
  userAddress: string;
  cohortId: string;
  unStakedTokenAddress: string;
  unStakedAmount: string;
  stakeId: string;
  time: string;
  hash: string;
  block: string;
  chainId: number;
}

export interface Claims {
  id: string;
  userAddress: string;
  cohortId: string;
  stakedTokenAddress: string;
  rewardTokenAddress: string;
  claimedRewards: string;
  time: string;
  hash: string;
  block: string;
  chainId: number;
}

export interface Referral {
  id: string;
  userAddress: string;
  tokenId: string;
  cohortId: string;
  stakeId: string;
  referrerAddress: string;
  stakedAmount: string;
  time: string;
  hash: string;
  block: string;
  chainId: number;
}

export interface ReferralClaim {
  id: string;
  userAddress: string;
  cohortId: string;
  refreeAddress: string;
  rewardTokenAddress: string;
  rewardAmount: string;
  time: string;
  hash: string;
  block: string;
  chainId: number;
}

export interface AllClaim {
  getAllUnstakes: Unstakes[];
  getAllClaimsByUser: Claims[];
}

export const ALL_POOLS = gql`
  query Query($where: PoolsGroupWhereClause!) {
    allPools(where: $where) {
      pools {
        token {
          id
          tokenId
          decimals
          userMinStake
          userMaxStake
          totalStakeLimit
          lockableDays
          tokenSequenceList
          tokenDailyDistribution
        }
        cohort {
          cohortAddress
          stakeDuration
          poolStartTime
          intervalDays
          tokens
          refferalPercentage
          cohortVersion
          rewardStrategy
          gaslessAvailablity
          tag
          proxies
        }
      }
      total_pools
    }
  }
`;

export const GET_ALL_CLAIMS = gql`
  query Query($where: UnStakeWhere, $getAllClaimsByUserWhere2: ClaimWhere) {
    getAllUnstakes(where: $where) {
      id
      userAddress
      cohortId
      unStakedTokenAddress
      unStakedAmount
      stakeId
      time
      hash
      block
      chainId
    }
    getAllClaimsByUser(where: $getAllClaimsByUserWhere2) {
      id
      userAddress
      cohortId
      stakedTokenAddress
      rewardTokenAddress
      claimedRewards
      time
      hash
      block
      chainId
    }
  }
`;

export const GET_SPECFIC_POOLS = gql`
  query Query($where: SpecficPoolsWhere!) {
    getSpecficPools(where: $where) {
      token {
        id
        tokenId
        decimals
        userMinStake
        userMaxStake
        totalStakeLimit
        lockableDays
        tokenSequenceList
        optionableStatus
        tokenDailyDistribution
        rewardCap
      }
      cohort {
        cohortAddress
        stakeDuration
        poolStartTime
        tokensCount
        intervalDays
        tokens
        refferalPercentage
        optionalBenefits
        cohortVersion
        rewardStrategy
        DAYS
        HOURS
        gaslessAvailablity
        chainId
        tag
        proxies
      }
    }
  }
`;

export interface AllReferredUserResponse {
  getAllTheReferedUser: Referral[];
  getReferralClaimByUser: ReferralClaim[];
}

export const GET_ALL_REFFERED_USER = gql`
  query Query(
    $where: ReferralEarnWhere
    $getReferralClaimByUserWhere2: ReferralEarnWhere
  ) {
    getAllTheReferedUser(where: $where) {
      id
      userAddress
      tokenId
      cohortId
      stakeId
      referrerAddress
      stakedAmount
      time
      hash
      block
      chainId
    }
    getReferralClaimByUser(where: $getReferralClaimByUserWhere2) {
      id
      userAddress
      cohortId
      refreeAddress
      rewardTokenAddress
      rewardAmount
      time
      hash
      block
      chainId
    }
  }
`;

export interface AllCohortsAndProxies {
  cohortAddress: string;
  proxies: string[];
}

export const ALL_COHORTS_AND_PROXIES = gql`
  query Query($where: CohortGroupWhereClause!) {
    allCohortsAndProxies(where: $where) {
      cohortAddress
      proxies
    }
  }
`;

export const SPECIFIC_UNSTAKES = gql`
  query GetSpecficUnstakes($where: GroupUnstakes) {
    getSpecficUnstakes(where: $where) {
      id
      userAddress
      cohortId
      unStakedTokenAddress
      stakeId
      unStakedAmount
      time
      hash
      block
      chainId
    }
  }
`;
