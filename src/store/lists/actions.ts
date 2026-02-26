import { createAction } from '@reduxjs/toolkit';
import { TokenMetaData } from './reducer';

export const fullfilledTokenList =
  createAction<{ tokenlist: { [chainId: number]: TokenMetaData[] } }>(
    'list/fullfilledList'
  );
