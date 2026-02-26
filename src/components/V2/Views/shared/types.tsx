export enum Page {
  ALL_FARMS,
  MY_STAKES,
}


export interface ApyProps {
  Apy: number;
  hasBoosterAvailable: boolean;
  page: Page;
  hasBoosterBuyed: boolean;
  boosterApy: number;
  openModal: () => void;
}

export interface PoolFilledProps {
  poolFilledPercentage: string;
}

interface Reward {
  name: string;
  icon: string;
}



export interface RewardsandTippyProps {
  rewards: Reward[];
  remainingRewards: Reward[];
}

export interface RewardsProps {
  rewards: Reward[];
  remainingRewards: Reward[];
}

export interface StakedAmountProps {
  amount: number;
  
}

export interface StakedOnProps {
  date: Date;
}
