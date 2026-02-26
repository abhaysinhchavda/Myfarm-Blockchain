import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'store';
import { ETH_CHAIN } from 'constants/chain';
import { getYF2FarmDetails } from 'utilities/V2/farms';
import { Farm, FarmData, FarmDetails } from 'store/V2/farms/reducer';
import { useApplicationUserState } from 'store/user/hooks';
import { setFarmData, setFarmDetails, setFarmToken } from 'store/V2/farms/action';
import { isEmpty } from 'lodash';
import { useTokenlist } from 'store/lists/hooks';
import { ICall } from '@makerdao/multicall';
import { createCalls } from 'utilities/V2/multicall';
import { multicall } from 'utilities/multicall';
import { formatFarmPublicData } from 'utilities/V2/reward';
import { BigNumber } from 'ethers';
import { getTokenInformationByAddress } from 'utilities';

let log = console.log;

export const useFetchV2Farms = (): void => {
  const dispatch = useDispatch<AppDispatch>();
  const { appChainId } = useApplicationUserState();
  useEffect(() => {
    // only ethereum chain supported right now
    async function fetchV2Farms() {
      try {
        if (appChainId === ETH_CHAIN) {
          const farms = await getYF2FarmDetails(appChainId);
          dispatch(setFarmToken(farms));
        }
      } catch (err) {
        if (err instanceof Error) {
          log(`V2 Farms derivation failed`, err.message);
        }
      }
    }
    fetchV2Farms();
  }, [appChainId, dispatch]);
};

export const useFetchFarmDetails = (): void => {
  const farms = useV2Farms();
  let tokenlist = useTokenlist();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isEmpty(farms) && !isEmpty(tokenlist)) {
      let k = 0;
      const farmDetailsPayload = [] as { farmDetails: FarmDetails }[];

      while (k < farms.length) {
        let { token, farmDetails } = farms[k];
        if (!isEmpty(token) && isEmpty(farmDetails)) {
          // derive farm token
          let farmToken = getTokenInformationByAddress(token.farmToken, tokenlist);

          if (!isEmpty(farmToken)) {
            let { symbol, icon, price } = farmToken;
            farmDetailsPayload.push({
              farmDetails: {
                farmName: symbol,
                farmIcon: icon,
                farmTokenPrice: price,
              },
            });
          }
        }
        k++;
      }
      if (!isEmpty(farmDetailsPayload)) {
        dispatch(setFarmDetails(farmDetailsPayload));
      }
    }
  }, [dispatch, farms, tokenlist]);
};

export const useFetchFarmData = (): void => {
  const farms = useV2Farms();
  const { appChainId } = useApplicationUserState();

  const dispatch = useDispatch<AppDispatch>();
  const tokenlist = useTokenlist();

  useEffect(() => {
    async function fetchFarmPublicData() {
      if (!isEmpty(farms) && !isEmpty(tokenlist)) {
        // aggregate calls
        const calls = [] as ICall[];

        // push all the active stakings
        for (var k = 0; k < farms.length; k++) {
          const { cohort, token, farmData, farmDetails } = farms[k];
          if (isEmpty(farmData) && !isEmpty(farmDetails)) {
            calls.push(
              createCalls(
                cohort.id,
                'totalStaking(uint32)(uint256)',
                [token.fid.toString()],
                [[`${token.id}`]]
              )
            );
          }
        }

        // grab the results
        if (!isEmpty(calls)) {
          const result = await multicall(appChainId, calls);
          const original = result.results.original;
          // create state
          let farmDatas = [] as { farmData: FarmData }[];
          for (var q = 0; q < farms.length; q++) {
            const farm = farms[q];
            const activeStaking = original[`${farm.token.id}`] as BigNumber;
            farmDatas.push({
              farmData: formatFarmPublicData(farm, activeStaking, [], tokenlist, 0),
            });
          }
          dispatch(setFarmData(farmDatas));
        }
      }
    }

    // call fetch farm public data
    fetchFarmPublicData();
  }, [appChainId, dispatch, farms, tokenlist]);
};

export const useV2Farms = (): Farm[] => {
  return useSelector((state: AppState) => state.yf2Farms.farms);
};
