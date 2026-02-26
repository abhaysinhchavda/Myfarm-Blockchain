import { createReducer } from "@reduxjs/toolkit";

import {
  setPopUpOpen,
  setPopUpClose,
  setAppCohorts,
  setActiveSnackBar,
  setActionScreenType,
  setStakeInputAmount,
  setSlipAmount
} from "./actions";

export enum PopUpTypes {
  WALLET,
  TRANSACTION,
  NETWORK,
  STAKE,
  UNSTAKE,
}

export interface AllCohort {
  cohortAddress: string;
  proxies: string[];
}

export interface SnackBarConfig {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

export interface ActionScreenInterface {
  action: "STAKE" | "UNSTAKE" | null;
  searchKey: string;
}

interface ApplicationState {
  openPopUp: PopUpTypes | null;
  snackbar: SnackBarConfig;
  actionScreen: ActionScreenInterface;
  appCohorts: AllCohort[] | null;
  stakeInputAmount: number;
  slipAmount: number;
}

const applicationState: ApplicationState = {
  openPopUp: null,
  snackbar: {
    open: false,
    message: "",
    severity: "success",
  },
  actionScreen: {
    action: null,
    searchKey: null,
  },
  appCohorts: null,
  stakeInputAmount: 100,
  slipAmount: 0.1,
};

const application = createReducer<ApplicationState>(
  applicationState,
  (builder) => {
    builder.addCase(setPopUpOpen, (state, { payload: { openPopUp } }) => {
      return {
        ...state,
        openPopUp,
      };
    }),
      builder.addCase(setPopUpClose, (state, { payload: { openPopUp } }) => {
        return {
          ...state,
          openPopUp,
        };
      }),
      builder.addCase(setAppCohorts, (state, { payload: { appCohorts } }) => {
        return {
          ...state,
          appCohorts,
        };
      }),
      builder.addCase(setActiveSnackBar, (state, { payload: { snackbar } }) => {
        return {
          ...state,
          snackbar,
        };
      }),
      builder.addCase(
        setActionScreenType,
        (state, { payload: { actionScreen } }) => {
          return {
            ...state,
            actionScreen,
          };
        }
      ),
      builder.addCase(
        setStakeInputAmount,
        (state, { payload: { stakeInputAmount } }) => {
          return {
            ...state,
            stakeInputAmount,
          };
        }
      );
    builder.addCase(
      setSlipAmount,
      (state, { payload: { slipAmount = 0.1} }) => {
        return {
          ...state,
          slipAmount,
        };
      })
  }
);

export default application;
