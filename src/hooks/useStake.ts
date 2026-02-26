import { useCallback, useState } from "react";
import { DEFAULT_REFFERAL_ADDRESS, GAS_MARGIN } from "../constants";
import {
  estimatedGas,
  gasPrice,
  unitFormatter,
  unitParser,
} from "../utilities";
import { useCohortContract, useTokenContract } from "./useContract";
import { useWeb3Provider } from "./useWeb3Provider";
import _ from "loadsh";
import {
  useDeriveStakeInputAmount,
  useOpenSnackBar,
  useOpenStakePopUp,
} from "../store/application/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setStakeInputAmount } from "../store/application/actions";

type BooleanOrNull = boolean | null;

interface StakeTransactionStatus {
  loading: BooleanOrNull;
  error: BooleanOrNull;
  completed: BooleanOrNull;
  errorMessage?: string | null;
}

export interface StakeResponse {
  transactionStatus: StakeTransactionStatus;
  maxButtonVisibility: boolean;
  inputError: string | null;
  stakedAmount: number;
  onMaxButton: () => void;
  onStake: () => void;
}

export const useStake = (
  cohortId: string,
  tokenId: string,
  decimals: number,
  userMaxStakeBalanceAvailable: number,
  balance: number
): StakeResponse => {
  var inputError: string | null = null;

  const cohort = useCohortContract(cohortId);

  const openSnackBar = useOpenSnackBar();

  const [maxButton, setMaxButton] = useState<boolean>(true);

  const stakeAmount = useDeriveStakeInputAmount();

  if (stakeAmount <= 0) {
    inputError = "Negative and zero values not allowed";
  }

  if (stakeAmount > userMaxStakeBalanceAvailable) {
    inputError = "Staking Limit Reached";
  }

  if (stakeAmount > balance) {
    inputError = "Insufficient Balance";
  }

  const [status, setStatus] = useState<StakeTransactionStatus>({
    loading: false,
    error: false,
    completed: false,
  });

  const stakeModalOpen = useOpenStakePopUp();

  const { account, active, library } = useWeb3Provider();

  const instance = useTokenContract(tokenId);

  const dispatch = useDispatch<AppDispatch>();

  const onMaxButton = useCallback(() => {
    if (!account || !active) return null;

    instance.balanceOf(account).then((balance) => {
      const formatBalance =
        Math.floor(unitFormatter(balance, decimals) * 10000) / 10000;
      dispatch(
        setStakeInputAmount({
          stakeInputAmount: formatBalance,
        })
      );
      setMaxButton(false);
    });
  }, [decimals, instance, account, active, dispatch]);

  const onStake = useCallback(async () => {
    if (!stakeAmount || !instance) return null;

    setStatus({
      loading: true,
      error: false,
      completed: false,
    });

    const parseTokens = unitParser(String(stakeAmount), decimals);

    const gasLimitExpected = await estimatedGas(
      cohort,
      "stake",
      [DEFAULT_REFFERAL_ADDRESS, tokenId, parseTokens],
      account
    );

    const gasLimit = _.round(
      _.add(
        gasLimitExpected,
        _.divide(_.multiply(gasLimitExpected, GAS_MARGIN), 100)
      ),
      0
    );

    const gas_price = await gasPrice(library);

    try {
      const transaction = await cohort
        .connect(library.getSigner())
        .stake(DEFAULT_REFFERAL_ADDRESS, tokenId, parseTokens, {
          gasLimit,
          gasPrice: gas_price,
        });

      await transaction.wait(2);

      setStatus({
        loading: false,
        error: false,
        completed: true,
      });

      //openSnackBar(true, "staked successfully", "success");

      stakeModalOpen();
    } catch (err) {
      openSnackBar(true, err.message, "error");
      console.log(err.message);
      setStatus({
        loading: false,
        error: true,
        completed: false,
      });
    }
  }, [
    openSnackBar,
    stakeModalOpen,
    account,
    cohort,
    decimals,
    instance,
    library,
    stakeAmount,
    tokenId,
  ]);

  return {
    transactionStatus: status,
    maxButtonVisibility: maxButton,
    inputError,
    stakedAmount: <number>stakeAmount,
    onMaxButton,
    onStake,
  };
};
