import { configureStore } from '@reduxjs/toolkit';
import application from './application/reducer';
import lists from './lists/reducer';
import user from './user/reducer';
import { save, load } from 'redux-localstorage-simple';
import farms from './farms/reducer';
import stakes from './stakes/reducer';
import referral from './referral/reducer';
import GetTokenList from './Token/reducer';
import balance from './balance/reducer';
import ido from './ido/reducer';
import yf2Farms from './V2/farms/reducer';
import dapp from 'store/V2/dapp/reducer';
import confirmedStaking from 'store/V2/staked/reducer';

const PERSISTED_KEYS: string[] = ['user', 'lists'];

const store = configureStore({
  reducer: {
    application,
    lists,
    user,
    balance,
    farms,
    stakes,
    referral,
    GetTokenList,
    ido,
    yf2Farms,
    dapp,
    confirmedStaking
  },
  middleware: [save({ states: PERSISTED_KEYS, namespace: 'testnet' })],
  preloadedState: load({
    states: PERSISTED_KEYS,
    namespace: 'testnet',
  }),
  devTools: true,
});

// Whole App State Data Type
export type AppState = ReturnType<typeof store.getState>;

// App Dispatcher Data Type
export type AppDispatch = typeof store.dispatch;

// export the store
export default store;
