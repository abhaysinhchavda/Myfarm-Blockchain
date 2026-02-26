// eslint-disable-next-line
import { createReducer } from '@reduxjs/toolkit';
import { CohortYF2, TokenMetaDataYF2 } from '../../../utilities/V2/types';
import { TokenMetaData } from '../../lists/reducer';
import { setFarmData, setFarmDetails, setFarmToken } from './action';

export interface FarmDetails {
  /** farm name  */
  farmName: string;
  /** farm token icon */
  farmIcon: string;
  /** farm token price */
  farmTokenPrice: number;
}

export interface FarmData {
  /** farm active staking */
  activeStaking: number;
  /** farm prior epoch TVLs */
  priorEpochTvls: number[];
  /** current APY */
  APY: number;
  /** reward tokens metadata */
  rewards: TokenMetaData[];
  /** booster APY */
  boosterAPY: number;
  /** total value locked in USD */
  usdTotalStaking: number;
  /** pool filled percentage */
  poolFilled: number;
  /** reward token addresses */
  rewardTokenAddress: string[];
  /** per block rewards */
  perBlockRewards: number[];
}

interface UserFarmData {
  /** user farm token balance */
  userFarmTokenBalance: number;
}

export interface Farm {
  /** cohort details */
  cohort: CohortYF2;
  /** farm details */
  farmDetails: FarmDetails;
  /** farm token */
  token: TokenMetaDataYF2;
  /** farm public data */
  farmData: FarmData;
  /** user related farm data */
  userFarmData: UserFarmData;
}

interface PublicFarm {
  /** list of farms */
  farms: Farm[] | null;
}

const farms: PublicFarm = {
  farms: null,
};

const yf2Farms = createReducer<PublicFarm>(farms, (builder) => {
  builder.addCase(setFarmToken, (state, { payload }) => {
    let farmsPublic = [] as Farm[];
    for (var k = 0; k < payload.length; k++) {
      let { cohort, token } = payload[k];
      farmsPublic.push({
        ...state[k],
        cohort,
        token,
      });
    }
    return { farms: farmsPublic };
  });
  builder.addCase(setFarmDetails, (state, { payload }) => {
    let latestFarms = [] as Farm[];
    let k = 0;
    while (k < state.farms.length) {
      let { farmDetails } = payload[k];
      latestFarms.push({ ...state.farms[k], farmDetails });
      k++;
    }
    return { farms: latestFarms };
  });
  builder.addCase(setFarmData, (state, { payload }) => {
    let farms = [] as Farm[];
    let k = 0;
    while (k < state.farms.length) {
      let { farmData } = payload[k];
      farms.push({ ...state.farms[k], farmData });
      k++;
    }
    return { farms };
  });
});

export default yf2Farms;
