import { createReducer } from "@reduxjs/toolkit";
import { setBalance } from "./action";

export interface Balance {
    balances: string[],
    tokens: string[]
}

const balanceState: Balance = {
    balances: null,
    tokens: null
}

const balance = createReducer<Balance>(balanceState, (builder) => {
    builder.addCase(setBalance, (state, {payload: {balances, tokens}}) => {
        return {
            ...state,
            balances,
            tokens
        };
    });
});

export default balance;