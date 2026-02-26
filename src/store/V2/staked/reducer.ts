import { createReducer } from "@reduxjs/toolkit";
import { setStakedTransaction } from "./action";

export interface StakingDetails {
	cohortVersion: string;
	farmName: string;
	sAmount: number;
	sAmountInUSD: number;
	transactionHash: string;
	tokenId?: number
}

export const stakingInitialState: StakingDetails = {
	cohortVersion: '',
	farmName: '',
	sAmount: 0,
	sAmountInUSD: 0,
	transactionHash: '',
	tokenId: 0
}

const confirmedStaking = createReducer<StakingDetails>(stakingInitialState, (builder) => {
	builder.addCase(setStakedTransaction, (state, { payload: { stakingDetails} }) => {
		return {
			...state,
			cohortVersion: stakingDetails.cohortVersion,
			farmName: stakingDetails.farmName,
			sAmount: stakingDetails.sAmount,
			sAmountInUSD: stakingDetails.sAmountInUSD,
			transactionHash: stakingDetails.transactionHash,
			tokenId: stakingDetails?.tokenId
		}
	})
})

export default confirmedStaking;