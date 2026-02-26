import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { BSC_CHAIN } from '../constants/chain';
import { useApplicationUserState } from '../store/user/hooks';
import { estimatedGas, gasPrice, roundValue } from '../utilities';
import { useIdoContract } from './useContract';
import _ from 'lodash';
import { GAS_MARGIN } from '../constants';
import { useDispatchRefetch } from '../store/ido/hooks';
import { useFirebaseDb } from './useFirebase';

export enum BUY_STATE {
  LOADING,
  COMPLETED,
  ERROR,
}

export const useBuyToken = (IDO: string, solanaAddress: string) => {
  const setUserTransaction = useFirebaseDb();

  const { appChainId } = useApplicationUserState();
  const { account, library } = useWeb3React();
  const [transactionStatus, setTransactionStatus] = useState<BUY_STATE>();

  const ido = useIdoContract(IDO);
  const refetch = useDispatchRefetch();

  const buyToken = useCallback(async () => {
    if (appChainId !== BSC_CHAIN || !ido || !solanaAddress) return null;

    try {
      setTransactionStatus(BUY_STATE.LOADING);

      const gasLimitExpected = await estimatedGas(ido, 'buy', [], account);

      // set the gas limit margin
      const gasLimit = roundValue(
        _.add(gasLimitExpected, _.divide(_.multiply(gasLimitExpected, GAS_MARGIN), 100)),
        0
      );

      const gas_price = await gasPrice(library);

      const transaction = await ido.connect(library.getSigner()).buy({
        from: account,
        gasLimit,
        gasPrice: gas_price,
      });

      await transaction.wait(2);

      // set this transaction to firebase
      setUserTransaction(transaction.hash, account, solanaAddress);

      // refetch again
      refetch();

      // set transaction status
      setTransactionStatus(BUY_STATE.COMPLETED);
    } catch (err) {
      setTransactionStatus(BUY_STATE.ERROR);
    }
  }, [appChainId, library, account, ido, refetch, setUserTransaction, solanaAddress]);

  return { transactionStatus, buyToken };
};
