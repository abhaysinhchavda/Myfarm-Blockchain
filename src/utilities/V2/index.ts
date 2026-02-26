//import { parseBytes32String } from 'ethers/lib/utils';
import { isEmpty, unitFormatter } from '..';
import { Cohort, ProtocolConfiguration, Token, Booster } from '../../graphql/V2/typings';
import {
  Booster as BoosterYF2,
  TokenMetaDataYF2,
  CohortYF2,
  ProtocolConfig as ProtocolConfigYf2,
} from './types';

const formatProtocolConfig = (
  protocolConfig: ProtocolConfiguration
): ProtocolConfigYf2 => {
  if (isEmpty(protocolConfig)) return null;
  return {
    ...protocolConfig,
    refPercentage: parseFloat(protocolConfig.referralPercentage),
  };
};

const formatBoosters = (boosters: Booster[]): BoosterYF2[] => {
  if (isEmpty(boosters)) return null;
  return boosters.map((items) => {
    return {
      id: items.id,
      bpid: parseFloat(items.bpid),
      paymentToken: items.paymentToken,
      boosterPackAmount: items.boosterPackAmount,
      numberOfBoostedUser: parseFloat(items.numberOfBoostedUser),
      boosterSell: items.boosterSell,
    };
  });
};

const formatCohortDetails = (cohort: Cohort): CohortYF2 => {
  if (isEmpty(cohort)) return null;
  return {
    id: cohort.id,
    protocolConfig: formatProtocolConfig(cohort.protocolConfig),
    cohortVersion: 'YF/V36',
    startBlock: parseFloat(cohort.startBlock),
    endBlock: parseFloat(cohort.endBlock),
    epochBlocks: parseFloat(cohort.epochBlocks),
    hasLiquidityMining: cohort.hasLiquidityMining,
    hasContainsWrappedToken: cohort.hasContainsWrappedToken,
    hasCohortLockinAvaliable: cohort.hasCohortLockinAvaliable,
    numberOfFarms: parseFloat(cohort.numberOfFarms),
    numberOfBoostedUsers: parseFloat(cohort.numberOfBoostedUsers),
    rewards: cohort.rewards,
    boosters: formatBoosters(cohort.boosters),
  };
};

const formatFarmTokenMetaDataDetails = (token: Token): TokenMetaDataYF2 => {
  if (isEmpty(token)) return null;
  const decimals = parseFloat(token.decimals);
  return {
    id: token.id,
    fid: parseFloat(token.fid),
    farmToken: token.farmToken,
    userMinStake: unitFormatter(token.userMinStake, decimals),
    userMaxStake: unitFormatter(token.userMaxStake, decimals),
    totalStakeLimit: unitFormatter(token.totalStakeLimit, decimals),
    decimals: decimals.toString(),
    skip: token.skip,
  };
};

export const formatFarmTokenDetails = (
  token: Token
): { cohort: CohortYF2; token: TokenMetaDataYF2 } => {
  if (isEmpty(token)) return null;
  return {
    cohort: formatCohortDetails(token.cohort),
    token: formatFarmTokenMetaDataDetails(token),
  };
};
