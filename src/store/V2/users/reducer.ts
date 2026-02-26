import { createReducer } from '@reduxjs/toolkit';
import { Farm } from '../farms/reducer';
import { setStakedFarm, setUserStakeData } from './action';

export interface UserStakeData {
  /** NFT token Id */
  nftTokenId: number;
  /** user staked amount */
  stakedAmount: number;
  /** staking start block */
  startBlock: number;
  /** when removed */
  endBlock: number;
  /** has user buyed the booster pack */
  hasBoosterBuyed: boolean;
}

interface Mint {
  /** mint Id */
  id: string;
  /** farm details where user staked */
  farm: Farm;
  /** user staking details */
  userStakeData: UserStakeData;
}

interface ClaimData {
  /** */
  rValue: string;
  /** */
  nftTokenId: number;
  /** */
  blockNumber: number;
  /** */
  transactionHash: string;
  /** */
  timeStamp: number;
}

interface Burn {
  id: string;
  /** burn farm details */
  farm: Farm;
  /** user stake details */
  userStakeDetails: UserStakeData;
  /** user claim details */
  claims: ClaimData[];
  /** block number */
  blockNumber: number;
  /** transaction hash */
  transactionHash: string;
  /** time stamp */
  timeStamp: number;
}

interface User {
  /** mints details */
  mints: Mint[];
  /** burns details */
  burns: Burn[];
}

const user: User = {
  mints: null,
  burns: null,
};

const users = createReducer<User>(user, (builder) => {
  builder.addCase(setStakedFarm, (state, { payload }) => {
    let mints = [] as Mint[];
    for (var k = 0; k < payload.length; k++) {
      const { cohort, token, farmDetails } = payload[k];
      mints.push({
        ...state.mints[k],
        farm: { cohort, token, farmDetails, farmData: null, userFarmData: null },
      });
    }
    return { mints, burns: state.burns };
  });
  builder.addCase(setUserStakeData, (state, { payload }) => {
    let mints = [] as Mint[];
    for (var k = 0; k < payload.length; k++) {
      const { id, userStakeData } = payload[k];
      mints.push({
        ...state.mints[k],
        id,
        userStakeData,
      });
    }
    return {
      mints,
      burns: state.burns,
    };
  });
});

export default users;
