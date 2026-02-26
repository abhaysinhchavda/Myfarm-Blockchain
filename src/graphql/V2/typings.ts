export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** UnifarmProtocolData store global admin analytics data */
export type UnifarmProtocolData = {
  __typename?: 'UnifarmProtocolData';
  /** factory contract address */
  id: Scalars['ID'];
  /** total active user on Unifarm */
  protocolTotalActiveUsers: Scalars['String'];
  /** total user on Unifarm */
  protocolTotalUsers: Scalars['String'];
  /** number of boosted user on Unifarm */
  numberOfBoostedUsers: Scalars['String'];
  /** total projects parternership */
  totalProjects: Scalars['String'];
  /** number of cohorts deployed */
  numberOfCohorts: Scalars['String'];
};

/** Cohort Entity to store cohort related details */
export type Cohort = {
  __typename?: 'Cohort';
  /** cohort contract address */
  id: Scalars['ID'];
  /** unifarm protocol global configuration */
  protocolConfig: ProtocolConfiguration;
  /** particular cohort version */
  cohortVersion: Scalars['String'];
  /** unifarm cohort start block number */
  startBlock: Scalars['String'];
  /** unifarm cohort end block number */
  endBlock: Scalars['String'];
  /** number of blocks in single checkpoint */
  epochBlocks: Scalars['String'];
  /** has liquidity mining in cohort */
  hasLiquidityMining: Scalars['Boolean'];
  /** has weth token as reward token in cohort */
  hasContainsWrappedToken: Scalars['Boolean'];
  /** has cohort lock in available */
  hasCohortLockinAvaliable: Scalars['Boolean'];
  /** number of farms */
  numberOfFarms: Scalars['String'];
  /** number of boosted users */
  numberOfBoostedUsers: Scalars['String'];
  /** all the reward token for cohort */
  rewards: Scalars['String'];
  /** all the booster information */
  boosters: Array<Booster>;
  /** helping to compute total reward disbursed */
  rIndex: Scalars['String'];
  /** total active users by cohort */
  totalActiveUsers: Scalars['String'];
  /** total users by cohort */
  totalUsers: Scalars['String'];
  /** cohort deployed at block number */
  deployedAtBlock: Scalars['String'];
  /** cohort timestamp when it deployed */
  deployedAt: Scalars['String'];
  tokens: Array<Token>;
};

/** Protocol Configuration Entity */
export type ProtocolConfiguration = {
  __typename?: 'ProtocolConfiguration';
  /** factory contract address */
  id: Scalars['ID'];
  /** protocol fee wallet address */
  feeWalletAddress: Scalars['String'];
  /** protocol fee percentage */
  feeAmount: Scalars['String'];
  /** protocol referral percentage */
  referralPercentage: Scalars['String'];
  cohort: Array<Cohort>;
};

/** Token Entity */
export type Token = {
  __typename?: 'Token';
  /** cohort contract address +'-'+ farmId */
  id: Scalars['ID'];
  /** cohort details */
  cohort: Cohort;
  /** farm id */
  fid: Scalars['String'];
  /** farm token */
  farmToken: Scalars['String'];
  /** user minimum staking allowed */
  userMinStake: Scalars['String'];
  /** user maximum staking allowed */
  userMaxStake: Scalars['String'];
  /** total stake limit of a farm */
  totalStakeLimit: Scalars['String'];
  /** token decimals */
  decimals: Scalars['String'];
  /** skip */
  skip: Scalars['Boolean'];
  /** farm total staking */
  totalStaking: Scalars['String'];
  /** farm total participants */
  totalParticipants: Scalars['String'];
  /** farm active participants */
  activeParticipants: Scalars['String'];
  claims: Array<ClaimHistory>;
  referrals: Array<Referral>;
};

/** Booster Entity */
export type Booster = {
  __typename?: 'Booster';
  /** cohort contract address +'-'+ bpid */
  id: Scalars['ID'];
  /** booster pack Id */
  bpid: Scalars['String'];
  /** payment token address */
  paymentToken: Scalars['String'];
  /** booster pack amount */
  boosterPackAmount: Scalars['String'];
  /** number of boosted user in single cohort */
  numberOfBoostedUser: Scalars['String'];
  /** sum of sold booster amount */
  boosterSell: Scalars['String'];
  boosterBuyHistories: Array<BoosterBuyHistory>;
};

/** BoosterBuyHistory Entity */
export type BoosterBuyHistory = {
  __typename?: 'BoosterBuyHistory';
  /** transaction hash */
  id: Scalars['ID'];
  /** user wallet address */
  user: Scalars['String'];
  /** cohort contract address */
  cohortId: Scalars['String'];
  /** booster pack details */
  booster: Booster;
  /** nft token id */
  nftTokenId: Scalars['String'];
};

/** ClaimHistory Entity */
export type ClaimHistory = {
  __typename?: 'ClaimHistory';
  /** transaction hash */
  id: Scalars['ID'];
  /** user address */
  user: Scalars['String'];
  /** cohort contract address */
  token: Token;
  /** nft token id */
  tokenId: Scalars['String'];
  /** reward aggregated value */
  rValue: Scalars['String'];
  /** claimed block number */
  blockNumber: Scalars['String'];
  /** claimed transaction hash */
  transactionHash: Scalars['String'];
  /** claimed timestamp */
  timestamp: Scalars['String'];
};

/** Transfer Entity */
export type Transfer = {
  __typename?: 'Transfer';
  /** transaction hash */
  id: Scalars['ID'];
  /** sender wallet address */
  from: Scalars['String'];
  /** reciever wallet address */
  to: Scalars['String'];
  /** nft token id */
  tokenId: Scalars['String'];
  /** block number on which token is transferred */
  blockNumber: Scalars['String'];
  /** transaction hash */
  transactionHash: Scalars['String'];
  /** timestamp on which nft token is transferred */
  timestamp: Scalars['String'];
};

/** Referral Entity */
export type Referral = {
  __typename?: 'Referral';
  /** referralAddress + '-' + tokenId */
  id: Scalars['ID'];
  /** farm token details */
  token: Token;
  /** nft token id */
  tokenId: Scalars['String'];
  /** refered user address */
  referedUser: Scalars['String'];
  /** referral address */
  referralAddress: Scalars['String'];
  /** reward value */
  rValue: Scalars['String'];
  /** block number */
  blockNumber: Scalars['String'];
  /** transaction hash */
  transactionHash: Scalars['String'];
  /** block timestamp */
  timestamp: Scalars['String'];
};
