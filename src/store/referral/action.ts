import { createAction } from "@reduxjs/toolkit";
import { ReferralData } from "./reducer";

export const setReferralData = createAction<ReferralData>(
  "referral/setReferralData"
);
