export interface Token {
  tokenId: string;
  decimals: number;
  userMinStake: number;
  userMaxStake: number;
  totalStakeLimit: number;
  lockableDays: number;
  tokenSequenceList: string[];
  tokenDailyDistribution: string[];
}

export interface Cohort {
  cohortId: string;
  poolStartTime: number;
  stakeDuration: number;
  intervalDays: string[];
  refferalPercentage: number;
  cohortVersion: string;
  rewardStrategy: string;
  tokens: string[];
  gaslessAvailablity: boolean;
  tag: string;
  proxies: string[];
}
