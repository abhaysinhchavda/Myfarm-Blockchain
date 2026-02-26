import { useCallback, useState } from "react";
import { useWeb3Provider } from "./useWeb3Provider";

import { useNFTManagerContract } from "./useContract";

type BooleanOrNull = boolean | null;

interface buyBoosterTransactionStatus {
	loading: BooleanOrNull;
	error: BooleanOrNull;
	completed: BooleanOrNull;
	errorMessage?: string | null;
	transactionHash?: string | null;
}

interface buyBoosterResponse {
	buyBoosterStatus: buyBoosterTransactionStatus,
	onBuyBooster: () => void;
}

export const useBuyBoosterPack = (
	cohortId: string,
	bpid: number,
	tokenId: number
): buyBoosterResponse => {

	const [status, setStatus] = useState<buyBoosterTransactionStatus>({
		loading: false,
		error: false,
		completed: false,
	});

	const { account } = useWeb3Provider()

	const managerInstance = useNFTManagerContract();

	const onBuyBooster = useCallback( async () => {
		if (!managerInstance) return null;

		setStatus({
			loading: true,
			error: false,
			completed: false
		})

		try {
			const transaction = managerInstance.connect(account).buyBoosterPackOnUnifarm(cohortId, bpid, tokenId)
			
			await transaction.wait();

			setStatus({
				loading: false,
				error: false,
				completed: true,
				transactionHash: transaction.hash 
			})
		} catch(err) {
			console.log(err.message);
			setStatus({
				loading: false,
				error: false,
				completed: false,
				errorMessage: err.message
			})
		}
	}, [
		account,
		tokenId,
		bpid,
		cohortId,
		managerInstance
	])

	return {
		buyBoosterStatus: status,
		onBuyBooster
	}
}