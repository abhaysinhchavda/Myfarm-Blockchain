import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AllCohortsAndProxies,
  ALL_COHORTS_AND_PROXIES,
} from "../../graphql/queries";
import { useChainIdError } from "../../hooks/useChainIdError";
import { AppDispatch, AppState } from "../index";
import { useApplicationUserState } from "../user/hooks";
import {
  setActionScreenType,
  setActiveSnackBar,
  setAppCohorts,
  setPopUpClose,
  setPopUpOpen,
  setSlipAmount,
  setStakeInputAmount,
} from "./actions";
import { AllCohort, PopUpTypes } from "./reducer";

export const usePopupStatus = (popUp: PopUpTypes): boolean => {
  const openedPopUp: PopUpTypes = useSelector((state: AppState) => {
    return state.application.openPopUp;
  });
  return useMemo(() => {
    return openedPopUp === popUp;
  }, [popUp, openedPopUp]);
};

export const useSetPopUp = (popUp: PopUpTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(() => {
    dispatch(
      setPopUpOpen({
        openPopUp: popUp,
      })
    );
  }, [dispatch, popUp]);
};

export const useOpenWalletPopUp = () => {
  return useSetPopUp(PopUpTypes.WALLET);
};

export const useOpenTransactionPopUp = () => {
  return useSetPopUp(PopUpTypes.TRANSACTION);
};

export const useOpenNetworkPopUp = () => {
  return useSetPopUp(PopUpTypes.NETWORK);
};

export const useOpenStakePopUp = () => {
  return useSetPopUp(PopUpTypes.STAKE);
};

export const useOpenUnstakePopUp = () => {
  return useSetPopUp(PopUpTypes.UNSTAKE);
};

export const useClosePopup = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    dispatch(
      setPopUpClose({
        openPopUp: null,
      })
    );
  }, [dispatch]);
};

export const useOpenSnackBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useCallback(
    (
      open: boolean,
      message: string,
      severity: "error" | "info" | "success" | "warning"
    ) => {
      dispatch(
        setActiveSnackBar({
          snackbar: {
            open,
            message,
            severity,
          },
        })
      );
    },
    [dispatch]
  );

  return open;
};

export const useActionScreenTypeCallback = () => {
  const dispatch = useDispatch();
  return useCallback(
    (action: "STAKE" | "UNSTAKE" | null, searchKey: string) => {
      if (!action || !searchKey) return null;

      dispatch(
        setActionScreenType({
          actionScreen: {
            action,
            searchKey,
          },
        })
      );
    },
    [dispatch]
  );
};

export const useActionback = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(
      setActionScreenType({
        actionScreen: {
          action: null,
          searchKey: null,
        },
      })
    );
  }, [dispatch]);
};

export const useActionScreenType = () => {
  return useSelector((state: AppState) => state.application.actionScreen);
};

export const useCloseSnackBar = () => {
  const dispatch = useDispatch();
  const { severity } = useStatusSnackBar();
  return useCallback(() => {
    dispatch(
      setActiveSnackBar({
        snackbar: {
          open: false,
          message: "",
          severity,
        },
      })
    );
  }, [dispatch, severity]);
};

export const useStatusSnackBar = () => {
  return useSelector((state: AppState) => state.application.snackbar);
};

export const useObtainAppCohorts = () => {
  const { appChainId } = useApplicationUserState();

  const dispatch = useDispatch<AppDispatch>();
  const chainIdError = useChainIdError();

  const { refetch } = useQuery<{
    allCohortsAndProxies: AllCohortsAndProxies[];
  }>(ALL_COHORTS_AND_PROXIES, {
    variables: {
      where: {
        chainId: appChainId,
      },
    },
    skip: true,
  });

  useEffect(() => {
    const fetchAppCohorts = async () => {
      try {
        const result = await refetch({ where: { chainId: appChainId } });
        var appCohorts = [] as AllCohort[];
        for (var c = 0; c < result.data.allCohortsAndProxies.length; c++) {
          const cohortItem = result.data.allCohortsAndProxies[c];
          const proxies = cohortItem.proxies?.map((address) => {
            return address?.toLocaleLowerCase();
          });
          appCohorts.push({ cohortAddress: cohortItem.cohortAddress, proxies });
        }

        dispatch(
          setAppCohorts({
            appCohorts,
          })
        );
      } catch (err) {
        console.log(`errored ${err.message}`);
      }
    };

    if (chainIdError !== true) {
      fetchAppCohorts();
    }
  }, [appChainId, chainIdError, refetch, dispatch]);
};

export const useChangeStakeInput = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: number) => {
      console.log('value:',value)
      dispatch(
        setStakeInputAmount({
          stakeInputAmount: value,
        })
      );
    },
    [dispatch]
  );
};
export const useChangeSlipAmount = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: number) => {
      dispatch(
        setSlipAmount({
          slipAmount: value,
        })
      );
    },
    [dispatch]
  );
};

export const useDeriveStakeInputAmount = () => {
  return useSelector((state: AppState) => state.application.stakeInputAmount);
};

export const useAppCohorts = () => {
  return useSelector((state: AppState) => state.application.appCohorts);
};


export const useSwapSlipAmount = () => {
  return useSelector((state: AppState) => state.application.slipAmount);
};