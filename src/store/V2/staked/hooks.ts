import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'store';
import { StakingDetails } from './reducer';
import {setStakedTransaction} from './action';

export const useSetConfirmedStaking = (): ((stakingDetails: StakingDetails) => void) => {
	const dispatch = useDispatch<AppDispatch>();
	return useCallback(
		(stakingDetails: StakingDetails) => {
			dispatch(setStakedTransaction({stakingDetails}))
		}, [dispatch]);
};

export const useConfirmStaking = (): StakingDetails => {
	return useSelector((state: AppState) => state.confirmedStaking);
}