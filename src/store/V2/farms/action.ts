import { createAction } from '@reduxjs/toolkit';
import { CohortYF2, TokenMetaDataYF2 } from '../../../utilities/V2/types';
import { FarmData, FarmDetails } from './reducer';

export const setFarmToken = createAction<
  { cohort: CohortYF2; token: TokenMetaDataYF2 }[]
>('/v2/farms/setFarmToken');

export const setFarmDetails = createAction<{ farmDetails: FarmDetails }[]>(
  '/v2/farms/setFarmDetails'
);

export const setFarmData = createAction<{ farmData: FarmData }[]>(
  '/v2/farms/setFarmData'
);
