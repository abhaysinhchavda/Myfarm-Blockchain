import { useCallback, useState } from "react";
import { useWeb3Provider } from "./useWeb3Provider";
import { unitParser } from "../utilities";

import { useNFTManagerContract } from "./useContract";

type BooleanOrNull = boolean | null;

interface claimTransactionStatus {
	loading: BooleanOrNull;
	error: BooleanOrNull;
	completed: BooleanOrNull;
	errorMessage?: string | null;
}

interface claimResponse {
	claimStatus: claimTransactionStatus,
	onClaim: () => void;
}

export const useClaim = (
	tokenId: number
): claimResponse => {

	const [status, setStatus] = useState<claimTransactionStatus>({
		loading: false,
		error: false,
		completed: false,
	});

	const { account } = useWeb3Provider()

	const managerInstance = useNFTManagerContract();

	const onClaim = useCallback( async () => {
		if (!managerInstance) return null;

		try {
			const transaction = managerInstance
				.connect(account)
				.claimOnUnifarm(tokenId)
			
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
				error: false,
				completed: false
			})
		}
	}, [
		account,
		tokenId
	])

	return {
		claimStatus: status,
		onClaim
	}
}