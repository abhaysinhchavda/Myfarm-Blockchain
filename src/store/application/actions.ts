import { createAction } from "@reduxjs/toolkit";
import { AllCohort, PopUpTypes, SnackBarConfig } from "./reducer";
import { ActionScreenInterface } from "./reducer";

export const setPopUpOpen =
  createAction<{ openPopUp: PopUpTypes }>("app/setPopUpOpen");
export const setPopUpClose =
  createAction<{ openPopUp: null }>("app/setPopUpClose");
export const setAppCohorts =
  createAction<{ appCohorts: AllCohort[] }>("app/setAppCohorts");
export const setActiveSnackBar = createAction<{ snackbar: SnackBarConfig }>(
  "app/setActiveSnackBar"
);

export const setActionScreenType = createAction<{
  actionScreen: ActionScreenInterface;
}>("app/setActionScreenType");

export const setStakeInputAmount = createAction<{ stakeInputAmount: number }>(
  "app/setStakeInputAmount"
);
export const setSlipAmount = createAction<{ slipAmount: number }>(
  "app/setSlipAmount"
);
