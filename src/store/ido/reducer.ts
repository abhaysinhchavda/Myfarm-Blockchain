import { createReducer } from '@reduxjs/toolkit';
import { TokenMetaData } from '../lists/reducer';
import { setIdoProjects, setRefetch } from './action';

export enum SaleStatus {
  /** indicates active sale */
  ACTIVE = 'ACTIVE',
  /** indicates upcoming sale */
  UPCOMING = 'UPCOMING',
  /** indicates sold out sale */
  SOLD_OUT = 'SOLD OUT',
  /** indicates close sale */
  CLOSED = 'CLOSED',
}

export type User = {
  /** user allocate amount */
  allocateAmount: number;
  /** has user buyed */
  hasBuyed: boolean;
};

export type Eligibility = {
  /** label of eligibility */
  eligibilityLabel: string;
  /** whole eligibility description */
  eligibilityDescription: string;
};

export type ProjectExtraDetails = {
  /** IDO contract address */
  idoAddress: string;
  /** eligibility createria's */
  eligibility: Eligibility[];
  /** a big size sell token logo */
  sellTokenLogo: string;
};

export type Project = {
  /** payment token details */
  paymentToken: TokenMetaData;
  /** sell token details */
  sellToken: TokenMetaData;
  /** start time */
  startTime: number;
  /** end time */
  endTime: number;
  /** purcahse cap */
  purchaseCap: number;
  /** total participants count */
  participantsCount: number;
  /** total raised amount */
  totalRaised: number;
  /** total Raised percentage */
  totalRaisedInPercentage: number;
  /** userData */
  userData: User;
  /** extra details */
  extra: ProjectExtraDetails;
  /** sale status */
  saleStatus: SaleStatus;
};

export interface IDO {
  projects: Project[];
  refetch: boolean;
}

const idoState: IDO = {
  projects: [],
  refetch: false,
};

const ido = createReducer<IDO>(idoState, (builder) => {
  builder.addCase(setIdoProjects, (state, { payload: { projects } }) => {
    return {
      ...state,
      projects,
    };
  }),
    builder.addCase(setRefetch, (state, { payload: { refetch } }) => {
      return {
        ...state,
        refetch,
      };
    });
});

export default ido;
