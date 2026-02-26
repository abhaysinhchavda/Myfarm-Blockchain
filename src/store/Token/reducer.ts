import { createReducer } from "@reduxjs/toolkit";
import { filltoken } from "./action";

export interface MainTokenData {
  name: string;
}
//
interface TokenList {
  tokenlist: MainTokenData[] | null;
}

const tokenlistState: TokenList = {
  tokenlist: null,
};

const GetTokenList = createReducer(tokenlistState, (builder) => {
  builder.addCase(filltoken, (state, { payload: { tokenlist } }) => {
    return {
      ...state,
      tokenlist,
    };
  });
});

export default GetTokenList;
