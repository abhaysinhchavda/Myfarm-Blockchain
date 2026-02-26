import { useCallback, useState } from 'react';
import { useWeb3Provider } from './useWeb3Provider';
import { unitParser } from '../utilities';

import { useNFTManagerContract } from './useContract';

type BooleanOrNull = boolean | null;

interface mintTransactionStatus {
  loading: BooleanOrNull;
  error: BooleanOrNull;
  completed: BooleanOrNull;
  errorMessage?: string | null;
}

export interface mintResponse {
  mintTransactionStatus: mintTransactionStatus;
  tokenId: number;
  transactionHashWithoutBooster: string;
  onStakeOnUnifarm: () => void;
}

interface mintWithBoosterTransactionStatus {
  loading: BooleanOrNull;
  error: BooleanOrNull;
  completed: BooleanOrNull;
  errorMessage?: string | null;
}

export interface mintWithBoosterResponse {
  mintWithBoosterTransactionStatus: mintWithBoosterTransactionStatus;
  transactionHashWithBooster: string;
  onStakeAndBuyBoosterPackOnUnifarm: () => void;
}

export const useMint = (
  referralAddress: string,
  sAmount: number,
  cohortAddress: string,
  farmTokenAddress: string,
  farmId: number
): mintResponse => {
  const [status, setStatus] = useState<mintTransactionStatus>({
    loading: false,
    error: false,
    completed: false,
  });

  const [transaction, setTransaction] = useState<string>('');
  const [tokenId, setTokenId] = useState(0);

  const { library, account } = useWeb3Provider();

  const managerInstance = useNFTManagerContract();

  const onStakeOnUnifarm = useCallback(async () => {
    if (!managerInstance) return null;

    setStatus({
      loading: true,
      error: false,
      completed: false,
    });

    try {
      const mint = await managerInstance
        .connect(library.getSigner())
        .stakeOnUnifarm(
          cohortAddress,
          referralAddress,
          farmTokenAddress,
          unitParser(sAmount),
          farmId,
          {
            from: account,
          }
        );

      const { events } = await mint.wait();
      // console.log(mint);
      // console.log('\n', mint?.events);

      // // fetch tokenId from event
      // const event = mintedTransaction.events?.find(event => event.event === 'ReferedBy');
      // console.log(event);

      setStatus({
        loading: false,
        error: false,
        completed: true,
      });

      setTransaction(mint?.hash);

      setTokenId(Number(events[3].topics[1]));
    } catch (err) {
      console.log(err.message);
      setStatus({
        loading: false,
        error: true,
        completed: false,
      });
    }
  }, [
    account,
    sAmount,
    library,
    referralAddress,
    managerInstance,
    cohortAddress,
    farmId,
    farmTokenAddress,
  ]);

  return {
    mintTransactionStatus: status,
    tokenId,
    transactionHashWithoutBooster: transaction,
    onStakeOnUnifarm,
  };
};

export const useMintWithBoosterPack = (
  cohortAddress: string,
  farmTokenAddress: string,
  referralAddress: string,
  farmId: number,
  bpid: number,
  sAmount: number
): mintWithBoosterResponse => {
  const [status, setStatus] = useState<mintWithBoosterTransactionStatus>({
    loading: false,
    error: false,
    completed: false,
  });

  const [transaction, setTransaction] = useState<string>('');

  const { account } = useWeb3Provider();
  const managerInstance = useNFTManagerContract();

  const onStakeAndBuyBoosterPackOnUnifarm = useCallback(async () => {
    if (!managerInstance) return null;

    setStatus({
      loading: true,
      error: false,
      completed: false,
    });

    try {
      const mint = await managerInstance
        .connect(account)
        .stakeAndBuyBoosterPackOnUnifarm(
          cohortAddress,
          referralAddress,
          farmTokenAddress,
          bpid,
          unitParser(sAmount),
          farmId,
          {
            from: account,
          }
        );

      await mint.wait();

      setStatus({
        loading: false,
        error: false,
        completed: true,
      });

      setTransaction(mint?.hash);
    } catch (err) {
      console.log(err.message);
      setStatus({
        loading: false,
        error: true,
        completed: false,
      });
    }
  }, [
    bpid,
    managerInstance,
    sAmount,
    account,
    referralAddress,
    cohortAddress,
    farmId,
    farmTokenAddress,
  ]);

  return {
    mintWithBoosterTransactionStatus: status,
    transactionHashWithBooster: transaction,
    onStakeAndBuyBoosterPackOnUnifarm,
  };
};
