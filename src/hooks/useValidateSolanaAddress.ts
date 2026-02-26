import { useCallback, useState } from 'react';
import WAValidator from 'multicoin-address-validator';

export const useValidateSolanaAddress = (): {
  errorMessage: string;
  solanaAddress: string;
  solanaInputHandler: (solanaAddress: string) => void;
} => {
  const [solanaAddress, setSolanaAddress] = useState<string>(null);
  let errorMessage: string;

  if (!solanaAddress) {
    errorMessage = 'Enter Your Solana Address';
  }

  if (!WAValidator.validate(solanaAddress, 'Solana')) {
    errorMessage = 'Invalid Solana Address';
  }

  const solanaInputHandler = useCallback((solanaAddress: string) => {
    setSolanaAddress(solanaAddress);
  }, []);
  return {
    errorMessage,
    solanaAddress,
    solanaInputHandler,
  };
};
