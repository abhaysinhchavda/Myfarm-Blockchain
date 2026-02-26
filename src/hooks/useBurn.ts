import { useCallback, useState } from "react";
import { useWeb3Provider } from "./useWeb3Provider";

import { useNFTManagerContract } from "./useContract";

type BooleanOrNull = boolean | null;

interface burnTransactionStatus {
  loading: BooleanOrNull;
  error: BooleanOrNull;
  completed: BooleanOrNull;
  errorMessage?: string | null;
}

export interface burnResponse {
  burnTransactionStatus: burnTransactionStatus;
  onUnstake: () => void; 
}

export const useMint = (
  tokenId: number
): burnResponse => {

	const [status, setStatus] = useState<burnTransactionStatus>({
		loading: false,
		error: false,
		completed: false,
	});

	const { account } = useWeb3Provider()

	const managerInstance = useNFTManagerContract();

	const onUnstake = useCallback(async () => {
		if (!managerInstance) return null;

		try {
			const transaction = await managerInstance
				.connect(account)
				.unstakeOnUnifarm(tokenId);

			transaction.wait(2);

			setStatus({
				loading: false,
				error: false,
				completed: true
			})
		} catch(err) {
			console.log(err.message);
			setStatus({
				loading: false,
				error: true,
				completed: false
			})

		}

	}, [
		account,
		tokenId
	])

	return {
		burnTransactionStatus: status,
		onUnstake
	}
}