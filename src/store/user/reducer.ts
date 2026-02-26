import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_APP_CHAIN, DEFAULT_REFFERAL_ADDRESS } from '../../constants';
import {
  activateOrDeactivateGaslessMode,
  setAppChainId,
  setCollapseSidebar,
  setDarkMode,
  setPoolsTabPosition,
  setRefererAddress,
  setStakesTabPosition,
  setView,
} from './actions';

export enum Views {
  LIST,
  GRID,
}

export enum PoolsTabPosition {
  POOLS,
  HOT_POOLS,
}

export enum StakeTabPosition {
  STAKE,
  CLAIM,
}

interface User {
  appChainId: number;
  referrer: string;
  view: Views;
  darkMode: boolean;
  gasLessMode: boolean;
  collapseSideBar: boolean;
  myStakeTabPosition: StakeTabPosition;
  poolTabPosition: PoolsTabPosition;
}

const userState: User = {
  appChainId: DEFAULT_APP_CHAIN,
  referrer: DEFAULT_REFFERAL_ADDRESS,
  view: Views.GRID,
  darkMode: false,
  gasLessMode: false,
  collapseSideBar: true,
  myStakeTabPosition: StakeTabPosition.STAKE,
  poolTabPosition: PoolsTabPosition.POOLS,
};

const user = createReducer<User>(userState, (builder) => {
  builder.addCase(setAppChainId, (state, { payload: { appChainId } }) => {
    return {
      ...state,
      appChainId,
    };
  });
  builder.addCase(setRefererAddress, (state, { payload: { referrer } }) => {
    return {
      ...state,
      referrer,
    };
  }),
    builder.addCase(setView, (state, { payload: { view } }) => {
      return {
        ...state,
        view,
      };
    }),
    builder.addCase(setDarkMode, (state, { payload: { darkMode } }) => {
      return {
        ...state,
        darkMode,
      };
    }),
    builder.addCase(
      activateOrDeactivateGaslessMode,
      (state, { payload: { gasLessMode } }) => {
        return {
          ...state,
          gasLessMode,
        };
      }
    );
  builder.addCase(setCollapseSidebar, (state, { payload: { collapseSideBar } }) => {
    return {
      ...state,
      collapseSideBar,
    };
  }),
    builder.addCase(
      setStakesTabPosition,
      (state, { payload: { myStakeTabPosition } }) => {
        return {
          ...state,
          myStakeTabPosition,
        };
      }
    ),
    builder.addCase(setPoolsTabPosition, (state, { payload: { poolTabPosition } }) => {
      return {
        ...state,
        poolTabPosition,
      };
    });
});

export default user;
