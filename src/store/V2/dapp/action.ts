import { createAction } from '@reduxjs/toolkit';
import { DappVersion } from './reducer';
import { View } from './reducer';

export const setVersion = createAction<{ version: DappVersion }>('v2/dapp/setVersion');
export const setAppView = createAction<{ view: View }>('v2/dapp/setAppView');
