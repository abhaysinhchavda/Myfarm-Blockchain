import { createAction } from "@reduxjs/toolkit";
import { StakeDetails } from "./reducer";

export const setUserStakes = createAction<{
  stakes: StakeDetails[];
  noStakesFound: boolean;
}>("stakes/setUserStakes");

export const setUserClaimHistory = createAction<{
  claims: StakeDetails[];
  noClaimFound: boolean;
}>("stakes/setUserClaimHistory");
