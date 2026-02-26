import { createReducer } from '@reduxjs/toolkit';
import { setAppView, setVersion } from './action';

export enum DappVersion {
  V1,
  V2,
}

export enum View {
  LIST,
  GRID,
}

interface Dapp {
  /** dapp version */
  version: DappVersion;
  /** pop ups */
  popUp: null;
  /** current view */
  view: View;
}

export const dappState: Dapp = {
  version: DappVersion.V2,
  popUp: null,
  view: View.LIST,
};

const dapp = createReducer<Dapp>(dappState, (builder) => {
  builder.addCase(setVersion, (state, { payload: { version } }) => {
    return {
      ...state,
      version,
    };
  });
  builder.addCase(setAppView, (state, { payload: { view } }) => {
    return {
      ...state,
      view,
    };
  });
});

export default dapp;
