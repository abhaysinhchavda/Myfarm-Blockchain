import { useCallback, useEffect, useState } from "react";
import { useTokenContract } from "./useContract";
import {
  estimatedGas,
  gasPrice,
  unitFormatter,
  unitParser,
} from "../utilities";
import { useWeb3Provider } from "./useWeb3Provider";
import _ from "lodash";
import { GAS_MARGIN } from "../constants";
import { useDeriveStakeInputAmount } from "../store/application/hooks";
import { useDebounce } from "use-debounce";

interface ApprovalResponse {
  loading: boolean;
  approval: boolean;
  triggeredApproval: (amount: number) => Promise<any>;
}

export const useApproval = (
  cohortId: string,
  tokenId: string,
  decimals: number
): ApprovalResponse => {
  const stakeInputAmount = useDeriveStakeInputAmount();

  const [stakeAmount] = useDebounce(stakeInputAmount, 2000);

  const [approval, setApproved] = useState<boolean | null>();

  const [loading, setLoading] = useState<boolean | null>();

  const { account, library } = useWeb3Provider();

  const instance = useTokenContract(tokenId);

  useEffect(() => {
    if (!instance || !stakeAmount || !account || !cohortId) return null;
    instance.allowance(account, cohortId).then((allowance) => {
      const formatAllowance = unitFormatter(allowance, decimals);
      if (formatAllowance >= stakeAmount) {
        setApproved(true);
      }
    });
  }, [account, approval, cohortId, stakeAmount, decimals, instance]);

  const triggeredApproval = useCallback(
    async (amount: number) => {
      try {
        if (!account || !instance || !amount || !decimals || !cohortId)
          return null;

        const parsedAmount = unitParser(String(amount), decimals);
        // get the callData
        //const data = await getData(instance, "approve", [getApprovalAddress, parseStakingAmount]);
        // get estimated gas
        const gasLimitExpected = await estimatedGas(
          instance,
          "approve",
          [cohortId, parsedAmount],
          account
        );

        // set the gas limit margin
        const gasLimit = _.round(
          _.add(
            gasLimitExpected,
            _.divide(_.multiply(gasLimitExpected, GAS_MARGIN), 100)
          ),
          0
        );

        // get the median gas price for latest 50 BLock.
        const gas_price = await gasPrice(library);

        setLoading(true);

        const transaction = await instance
          .connect(library.getSigner())
          .approve(cohortId, parsedAmount, {
            from: account,
            gasLimit,
            gasPrice: gas_price,
          });

        await transaction.wait(2);

        setApproved(true);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    },
    [cohortId, decimals, library, instance, account]
  );

  return {
    loading,
    approval,
    triggeredApproval,
  };
};
