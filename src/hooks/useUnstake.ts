import { useCallback, useState } from "react";
import { estimatedGas, gasPrice } from "../utilities";
import _ from "lodash";
import { GAS_MARGIN } from "../constants";
import { useWeb3Provider } from "./useWeb3Provider";
import { useCohortContract } from "./useContract";
import {
  useOpenSnackBar,
  useOpenUnstakePopUp,
} from "../store/application/hooks";

export interface TransactionResponse {
  loading: boolean;
  error: boolean;
  completed: boolean;
}

const useUnstake = (cohortId: string, stakeId: number) => {
  const [status, setStatus] = useState<TransactionResponse>({
    loading: false,
    error: false,
    completed: false,
  });

  const { account, library } = useWeb3Provider();

  const cohort = useCohortContract(cohortId);

  const openUnstakeModal = useOpenUnstakePopUp();
  const openSnackbar = useOpenSnackBar();

  const unStake = useCallback(async () => {
    if (!cohort || !account) return null;
    try {
      setStatus({
        loading: true,
        error: false,
        completed: false,
      });

      // get estimated gas
      const gasLimitExpected = await estimatedGas(
        cohort,
        "unStake",
        [account, stakeId],
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

      const tx = await cohort
        .connect(library.getSigner())
        .unStake(account, stakeId, {
          gasLimit,
          gasPrice: gas_price,
        });

      // atleast one transaction confirmation required
      await tx.wait(1);

      setStatus({
        loading: false,
        error: false,
        completed: true,
      });

      // after unstaking open the unstaking popup
      openUnstakeModal();

      /* } */
    } catch (err) {
      setStatus({
        loading: false,
        error: true,
        completed: false,
      });
      openSnackbar(true, `Something Wrong Went..`, "error");
      //
    }
  }, [account, cohort, library, stakeId, openUnstakeModal, openSnackbar]);

  return {
    status,
    unStake,
  };
};

export default useUnstake;
