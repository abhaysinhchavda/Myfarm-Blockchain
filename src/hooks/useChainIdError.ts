import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { BSC_CHAIN, POLYGON_CHAIN, ETH_CHAIN, AVAX_CHAIN } from '../constants/chain';
import { AppDispatch } from '../store';
import { useApplicationUserState } from '../store/user/hooks';
import { setAppChainId } from '../store/user/actions';

export const useChainIdError = () => {
  const { appChainId } = useApplicationUserState();
  const { chainId, active } = useWeb3React();
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(() => {
    if (active) {
      if (
        chainId === BSC_CHAIN ||
        chainId === POLYGON_CHAIN ||
        chainId === ETH_CHAIN ||
        chainId === AVAX_CHAIN
      ) {
        if (chainId != appChainId) {
          dispatch(
            setAppChainId({
              appChainId: chainId,
            })
          );
        }
        return false;
      }
      return !(appChainId === chainId);
    }
    return undefined;
  }, [appChainId, active, chainId, dispatch]);
};
