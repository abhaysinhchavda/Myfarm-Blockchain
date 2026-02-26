export interface ProtocolConfig {
  /** protocol fee wallet address */
  feeWalletAddress: string;
  /* protocol fee amount */
  feeAmount: string;
  /** protocol referral percentage */
  refPercentage: number;
}

export interface Booster {
  /** cohort contract address +'-'+ bpid */
  id: string;
  /** booster pack id */
  bpid: number;
  /** payment token address */
  paymentToken: string;
  /** booster pack amount */
  boosterPackAmount: number | string;
  /** number of booster users */
  numberOfBoostedUser?: number;
  /** sum of sold booster amount */
  boosterSell?: string;
}

export interface CohortYF2 {
  /** cohort contract address */
  id: string;
  /** protocol global configuration */
  protocolConfig: ProtocolConfig;
  /** specific cohort version */
  cohortVersion: string;
  /** cohort start block */
  startBlock: number;
  /** cohort end block */
  endBlock: number;
  /** number of blocks in single checkpoint */
  epochBlocks: number;
  /** has liquidity mining available */
  hasLiquidityMining: boolean;
  /** has reward contains Wrapped Token */
  hasContainsWrappedToken: boolean;
  /** has cohort lock in available */
  hasCohortLockinAvaliable: boolean;
  /** number of farms available in single cohort */
  numberOfFarms: number;
  /** number of boosted users in particular cohort */
  numberOfBoostedUsers: number;
  /** cohort reward tokens  */
  rewards: string;
  /** booster packs  */
  boosters: Booster[];
  /** helping to compute total reward disbursed  */
  rIndex?: string;
  /** total active users of a cohort */
  totalActiveUsers?: string;
  /** total users of a cohort */
  totalUsers?: string;
  /**  cohort deployed at block number */
  deployedAtBlock?: number;
  /** cohort timestamp when it deployed */
  deployedAt?: number;
}

export interface TokenMetaDataYF2 {
  /**  cohort contract address +'-'+ farmId */
  id: string;
  /** farm id */
  fid: number;
  /** farm token address */
  farmToken: string;
  /** user minimum staking allowed */
  userMinStake: number;
  /** user maximum staking allowed */
  userMaxStake: number;
  /** total stake limit of a farm */
  totalStakeLimit: number;
  /** farm token decimals */
  decimals: string;
  /** skip token */
  skip: boolean;
  /** total staking of a farm */
  totalStaking?: string;
  /** total participants of a farm */
  totalParticipants?: string;
  /** active participants of a farm */
  activeParticipants?: string;
}

export interface Stake {
  /** */
  fid: number;
  /** */
  nftTokenId: number;
  /** */
  stakedAmount: number;
  /** */
  startBlock: number;
  /** */
  endBlock: number;
  /** */
  originalOwner: string;
  /** */
  referralAddress: string;
  /** */
  isBooster: boolean;
}
