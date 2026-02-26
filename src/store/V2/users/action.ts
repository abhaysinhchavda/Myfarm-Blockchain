import { createAction } from '@reduxjs/toolkit';
import { CohortYF2, TokenMetaDataYF2 } from '../../../utilities/V2/types';
import { FarmDetails } from '../farms/reducer';
import { UserStakeData } from './reducer';

//

export const setStakedFarm = createAction<
  { cohort: CohortYF2; token: TokenMetaDataYF2; farmDetails: FarmDetails }[]
>('/v2/users/setStakedFarm');

//

export const setUserStakeData = createAction<
  {
    id: string;
    userStakeData: UserStakeData;
  }[]
>('/v2/users/setUserStakeData');
