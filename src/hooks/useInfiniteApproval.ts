import { useCallback, useState } from "react";

import { useTokenContract } from "./useContract";
import { useWeb3Provider } from "./useWeb3Provider";
import { INFINITE_AMOUNT, unifarmNFTManagerAddress } from "../constants/index";
import { unitParser } from "utilities";

type BooleanOrNull = boolean | null;

interface ApprovalStatus {
    loading: BooleanOrNull;
    error: BooleanOrNull;
    completed: BooleanOrNull;
    errorMessage?: string | null;
}

export const useInfiniteApproval = (tokenId: string) => {
	const [status, setStatus] = useState<ApprovalStatus>({
			loading: false,
			error: false,
			completed: false,
	});

	const { library, account, chainId } = useWeb3Provider();

	const instance = useTokenContract(tokenId);

	const onApprove = useCallback(async () => {
		if (!instance) return null;

		setStatus({
				loading: true,
				error: false,
				completed: false,
		});

		console.log(unifarmNFTManagerAddress[chainId]);
		const allowance = await instance.allowance(account, unifarmNFTManagerAddress[chainId]);
		if (allowance < unitParser(1000000, 18)) {
				try {
					await instance.connect(library.getSigner()).approve(unifarmNFTManagerAddress[chainId], INFINITE_AMOUNT);

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
						completed: false,
						errorMessage: err.message
					})
				}
		} else {
			setStatus({
				loading: false,
				error: false,
				completed: true
			})
		}
	}, [library, account, chainId, instance])

	return {
		approvalStatus: status,
		onApprove
	}
}