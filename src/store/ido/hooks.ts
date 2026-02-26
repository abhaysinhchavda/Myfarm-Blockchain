import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '..';
import { getProjects } from '../../utilities/ido';
import { useApplicationUserState } from '../user/hooks';
import { setIdoProjects, setRefetch } from './action';
import { useWeb3React } from '@web3-react/core';
import { isEmpty } from 'lodash';
import { ZERO_ADDRESS } from '../../constants';

export const useUpdateIdoData = () => {
  const { appChainId } = useApplicationUserState();
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useWeb3React();

  const refetch = useIDORefetch();

  useEffect(() => {
    const fetchIdoProjectsData = async () => {
      const projects = await getProjects(appChainId, !account ? ZERO_ADDRESS : account);
      if (!projects) {
        dispatch(setIdoProjects({ projects: undefined }));
        return;
      }
      dispatch(
        setIdoProjects({
          projects,
        })
      );
    };
    fetchIdoProjectsData();
  }, [appChainId, dispatch, account, refetch]);
};

export const useDispatchRefetch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(setRefetch({ refetch: true }));
  }, [dispatch]);
};

export const useObtainIDOProjects = () => {
  const projects = useSelector((state: AppState) => state.ido.projects);
  return isEmpty(projects) ? undefined : projects;
};

export const useIDORefetch = () => {
  return useSelector((state: AppState) => state.ido.refetch);
};
