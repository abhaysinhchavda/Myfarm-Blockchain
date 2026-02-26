import { createReducer } from "@reduxjs/toolkit";
import { TokenMetaData } from "../lists/reducer";
import { Farm } from "../farms/reducer";
import { setReferralData } from "./action";

interface ReferralRewards extends TokenMetaData {
  reward?: number;
}

export interface Referral extends Farm {
  referralRewards: ReferralRewards[];
  referedUserAddress: string;
  transactionHash: string;
  claimedOn: number;
}

export interface ReferralData {
  referrals: Referral[] | null;
  noReferFound: boolean;
  lastUpdated: number;
}

const referralState: ReferralData = {
  referrals: null,
  noReferFound: false,
  lastUpdated: 0,
};

const referral = createReducer<ReferralData>(referralState, (builder) => {
  builder.addCase(
    setReferralData,
    (state, { payload: { referrals, noReferFound, lastUpdated } }) => {
      return {
        ...state,
        referrals,
        noReferFound,
        lastUpdated,
      };
    }
  );
});

export default referral;
