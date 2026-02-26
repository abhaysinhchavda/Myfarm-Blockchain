import { useCallback, useState } from "react";
import { useWeb3Provider } from "./useWeb3Provider";

type BooleanOrNull = boolean | null;

interface TokenStatus {
    loading: BooleanOrNull;
    error: BooleanOrNull;
    completed: BooleanOrNull;
    errorMessage?: string | null;
}

interface RewardTokens {
  cohortId: string;
	rewardTokens: string[];
	pbr: Number[];
};

interface GetRewardTokenResponse {
	status: TokenStatus
	rewardTokens: RewardTokens;
}

export const useGetTokenReward = (
	cohortId: string
): GetRewardTokenResponse => {

	const [ status, setStatus] = useState<TokenStatus>({
		loading: false,
		error: false,
		completed: false
	});

	const [ rewardToken, setRewardToken ] = useState<RewardTokens>({
		cohortId: cohortId,
		rewardTokens: [],
		pbr: []
	})

	const getToken = useCallback(async () => {
		try {
			// const [token, pbr] = await getRewardTokens 
		} catch(err) {
			console.log(err.message)
			setStatus({
				loading: false,
				error: true,
				completed: false,
				errorMessage: err.message
			})
		}
	}, [

	])

	return 
}