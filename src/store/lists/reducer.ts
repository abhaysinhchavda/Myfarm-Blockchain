import { createReducer } from '@reduxjs/toolkit';
import { fullfilledTokenList } from './actions';

export interface TokenMetaData {
  name: string;
  symbol: string;
  address: string;
  icon: string;
  decimals: number;
  price: number;
  chainId: number;
  tags: string[] | [];
}

interface TokenList {
  tokenlist: { [chainId: number]: TokenMetaData[] };
}

const tokenlistState: TokenList = {
  tokenlist: null,
};

const lists = createReducer(tokenlistState, (builder) => {
  builder.addCase(fullfilledTokenList, (state, { payload: { tokenlist } }) => {
    return {
      ...state,
      tokenlist,
    };
  });
});

export default lists;
