import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '..';
import { fetchTokenList } from '../../utilities';
import { useApplicationUserState } from '../user/hooks';
import { fullfilledTokenList } from './actions';
import { TokenMetaData } from './reducer';

export const useObtainTokenlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchList = async () => {
      const tokenlist: { [chainId: number]: TokenMetaData[] } = await fetchTokenList();
      dispatch(
        fullfilledTokenList({
          tokenlist,
        })
      );
    };
    fetchList();
  }, [dispatch]);
};

export const useTokenlist = (): TokenMetaData[] => {
  const { appChainId } = useApplicationUserState();
  const tokenlist = useSelector((state: AppState) => state.lists.tokenlist);
  return isEmpty(tokenlist) ? null : tokenlist[appChainId];
};
