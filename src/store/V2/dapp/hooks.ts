import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'store';
import { setAppView, setVersion } from './action';
import { DappVersion, View } from './reducer';

export const useSwitchAppVersion = (): ((version: DappVersion) => void) => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (version: DappVersion) => {
      dispatch(setVersion({ version }));
    },
    [dispatch]
  );
};

export const useSwitchView = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (view: View) => {
      dispatch(setAppView({ view }));
    },
    [dispatch]
  );
};

export const useAppVersion = (): DappVersion => {
  return useSelector((state: AppState) => state.dapp.version);
};

export const useAppView = (): View => {
  return useSelector((state: AppState) => state.dapp.view);
};
