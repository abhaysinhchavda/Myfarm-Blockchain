import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, AppState } from "..";

import { useApplicationUserState } from "../user/hooks";
import { useWeb3React } from "@web3-react/core";
import { useTokenlist } from "../lists/hooks";
import { useChainIdError } from "../../hooks/useChainIdError";
import {
  isEmpty
} from "../../utilities";
import { getMulticallBalance } from "../../utilities/multicall";
import { setBalance } from "./action";
import { Balance } from "./reducer"


export const useFetchBalance = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { appChainId } = useApplicationUserState();

  const tokenlist = useTokenlist();
  const chainError = useChainIdError();

  const { account } = useWeb3React();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const tokens = tokenlist.map((token) => {
          return token.address
        })
        const allBalance = await getMulticallBalance(
          appChainId,
          tokens,
          account
        );
        console.log("allBalance:",allBalance);
        var storeBalance: Balance[] = [];
        
        let balances: string[] = [];
        let token: string[] = [];


        for (var i = 0; i < allBalance.length; i++) {
          token.push(allBalance[i].token[0]);
          balances.push(allBalance[i].balance.toString());
        }

        console.log(typeof(storeBalance))

        dispatch(
          setBalance({
            balances,
            tokens: token
          })
        );
        
      } catch (err) {
        console.log(`errored ${err.message}`);
      }
    };

    if (!isEmpty(tokenlist) && chainError !== true) {
      fetchBalance();
    }
  }, [appChainId, dispatch, tokenlist,account,chainError])
}

export const useBalance = () => {
  return useSelector((state: AppState) => state.balance);
};