import { useWeb3React } from "@web3-react/core";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "..";
import { getReferrals } from "../../utilities/referral";
import { useTokenlist } from "../lists/hooks";
import { useApplicationUserState } from "../user/hooks";
import { setReferralData } from "./action";

export const useSetReferralData = () => {
  const { appChainId } = useApplicationUserState();
  const { account } = useWeb3React();
  const tokenlist = useTokenlist();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const referrals = await getReferrals(appChainId, tokenlist, account);
        if (isEmpty(referrals)) {
          dispatch(
            setReferralData({
              referrals: [],
              noReferFound: true,
              lastUpdated: 0,
            })
          );
          return;
        }

        dispatch(
          setReferralData({
            referrals,
            noReferFound: false,
            lastUpdated: 0,
          })
        );
      } catch (err) {
        console.log(`errored ${err.message}`);
      }
    };

    if (account && !isEmpty(tokenlist)) {
      fetchReferrals();
    }
  }, [account, appChainId, tokenlist, dispatch]);
};

export const useReferralData = () => {
  return useSelector((state: AppState) => state.referral);
};
