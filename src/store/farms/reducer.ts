import { createReducer } from "@reduxjs/toolkit";
import { RewardToken } from "../../utilities";
import { TokenMetaData } from "../lists/reducer";
import { setFarms } from "./action";
import { Cohort, Token } from "./types";

export interface Farm {
  __fid: string;
  farmDetails: TokenMetaData;
  tokenDetails: Token;
  cohortDetails: Cohort;
  totalStaking: number;
  poolFilled: number;
  apyRange: number[];
  APY: number;
  rewardSequence: RewardToken[];
  locking: number;
  isHotpool: boolean;
  proxyAddress: string | null;
  farmEndTime: number;
}

export interface Farms {
  farms: Farm[] | null;
  total_pools: number;
}

const farmState: Farms = {
  farms: null,
  total_pools: 0,
};

const pools = createReducer<Farms>(farmState, (builder) => {
  builder.addCase(setFarms, (state, { payload: { farms, total_pools } }) => {
    return {
      ...state,
      farms,
      total_pools,
    };
  });
});

export default pools;
