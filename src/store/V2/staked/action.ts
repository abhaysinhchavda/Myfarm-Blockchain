import { createAction } from "@reduxjs/toolkit";
import { StakingDetails } from "./reducer";

export const setStakedTransaction = createAction<{stakingDetails: StakingDetails}>("SET_STAKED_DETAILS");