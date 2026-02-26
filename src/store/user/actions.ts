import { createAction } from "@reduxjs/toolkit";
import { PoolsTabPosition, StakeTabPosition, Views } from "./reducer";

export const setAppChainId =
  createAction<{ appChainId: number }>("user/setAppChainId");

export const setRefererAddress = createAction<{ referrer: string }>(
  "user/setRefererAddress"
);

export const setView = createAction<{ view: Views }>("user/setView");

export const setDarkMode =
  createAction<{ darkMode: boolean }>("user/setDarkMode");

export const activateOrDeactivateGaslessMode = createAction<{
  gasLessMode: boolean;
}>("user/activateOrDeactivateGaslessMode");

export const setCollapseSidebar = createAction<{ collapseSideBar: boolean }>(
  "user/setCollapseSidebar"
);

export const setPoolsTabPosition = createAction<{
  poolTabPosition: PoolsTabPosition;
}>("user/setPoolsTabPosition");

export const setStakesTabPosition = createAction<{
  myStakeTabPosition: StakeTabPosition;
}>("user/myStakeTabPosition");
