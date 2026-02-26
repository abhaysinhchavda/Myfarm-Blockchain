import { createReducer } from "@reduxjs/toolkit";
import { RewardToken } from "../../utilities";
import { Farm } from "../farms/reducer";
import { setUserClaimHistory, setUserStakes } from "./action";

export interface StakeDetails extends Farm {
  stakeId: number | null;
  stakedAmount: number;
  APY: number;
  time: number;
  rewards: RewardToken[];
  transactionHash: string | null;
}

export interface UserStakes {
  stakes: StakeDetails[] | null;
  claims: StakeDetails[] | null;
  noStakesFound: boolean;
  noClaimFound: boolean;
  lastUpdated: number;
}

const userStakes: UserStakes = {
  stakes: null,
  claims: null,
  noStakesFound: false,
  noClaimFound: false,
  lastUpdated: 0,
};

const stakes = createReducer<UserStakes>(userStakes, (builder) => {
  builder.addCase(
    setUserStakes,
    (state, { payload: { stakes, noStakesFound } }) => {
      return {
        ...state,
        stakes,
        noStakesFound,
      };
    }
  ),
    builder.addCase(
      setUserClaimHistory,
      (state, { payload: { claims, noClaimFound } }) => {
        return {
          ...state,
          claims,
          noClaimFound,
        };
      }
    );
});

export default stakes;
