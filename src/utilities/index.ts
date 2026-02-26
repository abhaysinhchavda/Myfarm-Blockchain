import { Block, Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { BigNumber } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { parseUnits, formatUnits } from '@ethersproject/units';
import axios from 'axios';
import _ from 'loadsh';
import { STARTFI_SPECIAL, UNIFARM_MAINNET, V1, V2, V3, YEAR } from '../constants';
import { isAddress } from 'ethers/lib/utils';
import { tokenlistUrls } from '../constants/lists';
import InjectedWalletBlockies from '../assets/images/others/connectedimage.png';
import WalletConnectLogo from '../assets/images/connectors/walletConnectIcon.svg';
import { Promise } from 'bluebird';
import { TokenMetaData } from '../store/lists/reducer';
import { MainTokenData } from '../store/Token/reducer';
import CohortABI from '../constants/ABI/cohorts/Cohort.json';
import { AllPools } from '../graphql/queries';
import { MAX_TOKENS_REWARDS } from '../hooks/useCohortHooks';
import dayjs from 'dayjs';
import CohortProxy from '../constants/ABI/cohorts/CohortPROXY.json';
import { getDefaultRPCProvider } from './provider';
import { Token, Cohort } from '../store/farms/types';
import { BSC_CHAIN, ETH_CHAIN, POLYGON_CHAIN } from '../constants/chain';
import V1ABI from '../constants/ABI/cohorts/V1ABI.json';
import V3ABI from '../constants/ABI/cohorts/V3ABI.json';
import {
  V1PROXY,
  V1REPROXY,
  V2PROXY,
  V2REPROXY,
  V2REPROXY_UPGRADE,
  V3PROXY,
  V3REPROXY,
  V3REPROXY_UPGRADE,
} from '../constants/proxy';
import currencyFormatter from 'currency-formatter';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const getConnectorName = (connector: AbstractConnector): string => {
  if (connector instanceof InjectedConnector && window.ethereum.isMetaMask) {
    return 'MetaMask';
  } else if (connector instanceof InjectedConnector) {
    return 'Injected';
  } else if (connector instanceof WalletConnectConnector) {
    return 'Wallet Connect';
  }
  return 'Unsupported Provider';
};

export const roundValue = (value: number, roundTo: number) => {
  return Math.floor(value * 10 ** roundTo) / 10 ** roundTo;
};

export const gasPrice = async (library: Web3Provider): Promise<BigNumber> => {
  return await library.getGasPrice();
};

export const miniWalletAddress = (address: string, chars = 4): string => {
  if (!address) return null;
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
};

export const unitParser = (units: string | number, decimals: number = 18): string => {
  if (!units) return null;
  return parseUnits(units.toString(), decimals).toString();
};

export const unitFormatter = (
  units: string | BigNumber,
  decimals: number = 18
): number => {
  if (!units) return null;
  return Number(formatUnits(units, decimals));
};

export const getQuatersInOneYear = (duration: number) => {
  return _.divide(YEAR, duration);
};

export const getUnifarmPrice = async (): Promise<number> => {
  const result: any = await axios.get(
    `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${UNIFARM_MAINNET}&vs_currencies=usd`
  );
  return result.data[UNIFARM_MAINNET]?.usd as number;
};

export const validateAddress = (address: string): boolean => {
  if (!address) return null;
  return isAddress(address);
};

export const getTVL = (tvl: number, price: number): number => {
  if (!tvl || !price) return null;
  return _.multiply(tvl, price);
};

export const fetchTokenList = async (): Promise<
  { [chainId: number]: TokenMetaData[] } | undefined
> => {
  try {
    const chainIds = Object.keys(tokenlistUrls);
    const allLists = chainIds.map((chainId) => axios.get(tokenlistUrls[chainId]));
    const results: any = await axios.all(allLists);
    let tokenlist: { [chainId: number]: TokenMetaData[] } = {};
    for (let t = 0; t < results.length; t++) {
      tokenlist[chainIds[t]] = results[t].data.tokenlist;
    }
    return tokenlist;
  } catch (err) {
    return;
  }
};

export const fetchManageTokenList = async (): Promise<MainTokenData[] | undefined> => {
  try {
    const results: any = await axios.get('https://messari.io/tokenlist/messari-verified');
    return results;
  } catch (err) {
    return;
  }
};

export const getTotalStaking = async (
  instance: Contract,
  tokenId: string,
  isProxy: boolean
): Promise<string> => {
  if (!instance || !tokenId) return null;
  if (isProxy) {
    const totalStaking = await instance.getTotalStaking(tokenId);
    return String(totalStaking);
  } else {
    const totalStaking: string = await instance.totalStaking(tokenId);
    return String(totalStaking);
  }
};

export const getProviderLogo = (connector: AbstractConnector): string => {
  if (connector instanceof InjectedConnector) {
    return InjectedWalletBlockies;
  } else if (connector instanceof WalletConnectConnector) {
    return WalletConnectLogo;
  } else {
    return InjectedWalletBlockies;
  }
};

export const usdCurrencyFormat = (values: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 6,
  }).format(values);
};

export const formatCurrency = (values: number, symbol: string) => {
  return currencyFormatter.format(values, {
    symbol,
    decimal: '.',
    thousand: ',',
    precision: 2,
    format: '%v %s',
  });
};

export const getAPYLimit = (aggreatedAPY: number, apyRange: number[]): number => {
  var apy = aggreatedAPY;
  if (aggreatedAPY > apyRange[1]) {
    apy = apyRange[1];
  }

  if (aggreatedAPY < apyRange[0]) {
    apy = apyRange[0];
  }

  return apy;
};

export const estimatedGas = async (
  contract: Contract,
  method: string,
  methodParams: any[],
  account: string
): Promise<BigNumber> => {
  const gasEstemation = await contract.estimateGas[method](...methodParams, {
    from: account,
  });
  return gasEstemation;
};

export interface RewardToken extends TokenMetaData {
  reward?: number;
}

export const getOneDayReward = (
  sequenceTokensMetaData: TokenMetaData[],
  stakedAmount: number,
  perDayRewards: string[],
  totalStaking: number,
  intervalDays: string[],
  stakeDuration: number
): RewardToken[] => {
  // get Reward Per Day
  const considerableTotalStaked = totalStaking ? totalStaking : stakedAmount;

  const allocPerShare = _.divide(stakedAmount, considerableTotalStaked);

  var getRewards: RewardToken[] = [];
  // it is assume that staking duration is 90 days.
  for (var r = 0; r < perDayRewards.length; r++) {
    const oneDayReward = unitFormatter(
      perDayRewards[r],
      sequenceTokensMetaData[r]?.decimals
    );

    const totalRewardDistributionPerDay: number = oneDayReward;

    const intervalDay = Number(intervalDays[r]);

    var balDays = _.subtract(stakeDuration / 86400, _.subtract(intervalDay, 1));

    // total reward per day, allocPerShare,balDay complex Computation
    const getRewardByIntervalDays = _.multiply(
      _.multiply(_.round(allocPerShare, 4), _.round(totalRewardDistributionPerDay, 2)),
      balDays
    );

    //console.log("getOneDayReward", getRewardByIntervalDays);
    getRewards.push({
      ...sequenceTokensMetaData[r],
      reward: _.round(Number(getRewardByIntervalDays), 4),
    });
  }

  return getRewards;
};

export const getCohortInstance = (chainId: number, address: string) => {
  if (!address) return null;
  const provider = getDefaultRPCProvider();
  if (chainId === ETH_CHAIN && address.toLowerCase() === V1.toLowerCase()) {
    return new Contract(address, V1ABI, provider);
  } else if (chainId === ETH_CHAIN && address.toLowerCase() === V3.toLowerCase()) {
    return new Contract(address, V3ABI, provider);
  }
  return new Contract(address, CohortABI, provider);
};

export const getReferralLink = (referralAddress: string) => {
  const PREFIX: string =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://dev.dashboard.unifarm.co';
  return `${PREFIX}/?referralAddress=${referralAddress}`;
};

/**
 * @param tokenId
 * @param tokenlist
 * @returns TokenMetaData
 */
export const getTokenInformationByAddress = (
  tokenId: string,
  tokenlist: TokenMetaData[]
): TokenMetaData | null => {
  const token = tokenlist.filter((e) => {
    return e.address.toLowerCase() === tokenId.toLowerCase();
  });
  if (isEmpty(token)) return null;
  return token[0];
};

export const getGroupTokenInformation = (
  tokenSequence: string[],
  tokenlist: TokenMetaData[]
): TokenMetaData[] => {
  const tokenInformations = tokenSequence.map((address) => {
    return tokenlist.filter((e) => {
      return e.address.toLowerCase() === address.toLowerCase();
    })[0];
  });
  return tokenInformations;
};

export interface DeseriallizedPool {
  token: Token;
  cohort: Cohort;
}

export const deserializePools = (pools: AllPools[]): DeseriallizedPool[] => {
  if (isEmpty(pools)) return null;
  return pools.map((items) => {
    const decimals = Number(items.token.decimals);
    return {
      token: {
        tokenId: items.token.tokenId.toLowerCase(),
        decimals,
        userMinStake: unitFormatter(items.token.userMinStake, decimals),
        userMaxStake: unitFormatter(items.token.userMaxStake, decimals),
        totalStakeLimit: unitFormatter(items.token.totalStakeLimit, decimals),
        lockableDays: Number(items.token.lockableDays),
        tokenSequenceList: items.token.tokenSequenceList,
        tokenDailyDistribution: items.token.tokenDailyDistribution,
      },
      cohort: {
        cohortId: items.cohort.cohortAddress,
        poolStartTime: Number(items.cohort.poolStartTime),
        stakeDuration: Number(items.cohort.stakeDuration),
        intervalDays: items.cohort.intervalDays,
        refferalPercentage: unitFormatter(items.cohort.refferalPercentage),
        cohortVersion: items.cohort.cohortVersion,
        rewardStrategy: items.cohort.rewardStrategy,
        tokens: items.cohort.tokens,
        gaslessAvailablity: items.cohort.gaslessAvailablity,
        tag: items.cohort.tag,
        proxies: items.cohort?.proxies?.map((address) => {
          return address?.toLowerCase();
        }),
      },
    };
  });
};

export const getNumberOfRemainingToken = (tokensCount: number): number => {
  const numberOfReamainingTokens =
    tokensCount > MAX_TOKENS_REWARDS ? _.subtract(tokensCount, MAX_TOKENS_REWARDS) : 0;
  return numberOfReamainingTokens;
};

export const getPoolStrength = (totalStaking: number, poolMaxStake: number) => {
  return (totalStaking / poolMaxStake) * 100;
};

export const getCurrentDateTime = () => {
  return dayjs().unix();
};

export const getMaxStakingAvailable = (
  userMaxStaking: number,
  userStakedBalance: number
) => {
  return _.subtract(userMaxStaking, userStakedBalance);
};

interface ComputeStakeRewardResponse {
  rewards: RewardToken[];
  accumulatedRewardInUSD: number;
}

export const computeStakeRewards = (
  tokenSpecs: TokenMetaData[],
  intervalDays: string[],
  oneDayReward: number[],
  dayStaked: number,
  hourly: boolean,
  isReferedBy: boolean,
  refPercentage: number
): ComputeStakeRewardResponse => {
  var deductReferEarning = 0;

  if (isReferedBy) {
    deductReferEarning = refPercentage;
  }
  var specification = [] as RewardToken[];
  var usdValuesArray = [] as number[];

  for (var i = 0; i < oneDayReward.length; i++) {
    const reward = oneDayReward[i];

    const { price } = tokenSpecs[i];

    if (isReferedBy) {
      deductReferEarning = refPercentage;
    }

    // this can be hourly or day biased.
    var interval = Number(intervalDays[i]);

    if (hourly) {
      interval = _.multiply(_.subtract(interval, 1), 24);
    }

    var diffDays = _.subtract(dayStaked, interval);
    /* console.log("diffDays", diffDays); */

    if (hourly) {
      diffDays = dayStaked >= 1 ? diffDays : 0;
    }

    // reset to 0 if difference days are negative it means there is no rewards yet for particular token.
    if (diffDays < 0) {
      diffDays = 0;
    }

    const dailyRewards = getRewardsForStakeDuration(reward, diffDays, deductReferEarning);

    specification.push({
      ...tokenSpecs[i],
      reward: dailyRewards,
    });

    usdValuesArray.push(_.multiply(dailyRewards, price));
  }

  return {
    rewards: specification,
    accumulatedRewardInUSD: _.sum(usdValuesArray),
  };
};

export const getRewardsForStakeDuration = (
  oneDayReward: number,
  diffTime: number,
  ref: number
): number => {
  const product = _.multiply(oneDayReward, diffTime);
  const refDeduction = _.divide(_.multiply(product, ref), 100);
  return product > refDeduction ? _.subtract(product, refDeduction) : 0;
};

export const getDate = (unix: number, chFormat?: boolean): string => {
  if (chFormat) {
    return dayjs.unix(unix).format('DD-MMMM-YYYY HH:MM:s A');
  }
  const date = dayjs.unix(unix).format('DD-MMMM-YYYY');
  return date;
};

export const isEmpty = <T>(array: T): boolean => {
  return _.isEmpty(array);
};

interface RewardResponse {
  rewards: number[];
  aggregatedUSDReward: number;
}

export const getRewardsBeforeStaking = (
  rewardSequence: TokenMetaData[],
  userWantToStake: number,
  perDayReward: string[],
  totalStaking: number,
  intervalDays: string[],
  stakeDuration: number,
  hourly: boolean
): RewardResponse => {
  // get Reward Per Day
  const considerableTotalStaked = Number(totalStaking) ? totalStaking : userWantToStake;

  const allocPerShare = _.divide(userWantToStake, considerableTotalStaked);

  var getRewards: number[] = [];
  var usdRewards: number[] = [];

  var duration: number = _.divide(stakeDuration, 86400);
  if (hourly) {
    duration = _.divide(stakeDuration, 3600);
  }

  for (var r = 0; r < perDayReward.length; r++) {
    const { decimals, price } = rewardSequence[r];

    const totalRewardDistributionPerDay: number = unitFormatter(
      perDayReward[r],
      decimals
    );

    const intervalDay = Number(intervalDays[r]);

    var balDays = _.subtract(
      duration,
      hourly ? _.multiply(_.subtract(intervalDay, 1), 24) : _.subtract(intervalDay, 1)
    );

    // total reward per day, allocPerShare,balDay complex Computation

    const getRewardByIntervalDays = _.multiply(
      _.multiply(
        roundValue(allocPerShare, 6),
        roundValue(totalRewardDistributionPerDay, 2)
      ),
      balDays
    );
    const reward = roundValue(Number(getRewardByIntervalDays), 2);
    getRewards.push(reward);
    usdRewards.push(_.multiply(reward, price));
  }

  const aggregatedUSDReward = _.sum(usdRewards);
  return {
    rewards: getRewards,
    aggregatedUSDReward,
  };
};

export const getPrecesionFactor = (stakeDuration: number) => {
  return _.divide(360, stakeDuration);
};

export const getApy = (
  rewardEarnedInUSd: number,
  useStakingAmountInUSD: number,
  Quater: number,
  canMultiply?: boolean
) => {
  if (!rewardEarnedInUSd) return 0;
  // we are getting {STAKE_DURATION} DAYS APY as of now.
  const lpShare = _.divide(rewardEarnedInUSd, useStakingAmountInUSD);
  const ApyForNinetyDays = _.multiply(lpShare, 100);
  if (canMultiply === false) {
    return ApyForNinetyDays;
  }
  var APY: number = _.multiply(ApyForNinetyDays, Quater);
  return APY;
};

export const getAPYRange = (chainId: number, cohortId: string): number[] => {
  if (chainId === ETH_CHAIN && cohortId.toLowerCase() === V1.toLowerCase()) {
    return [48, 250];
  } else if (chainId === ETH_CHAIN && cohortId.toLowerCase() === V2.toLowerCase()) {
    return [56, 350];
  } // ORO-WETH - ~ UFARM-USDC farm
  else if (
    chainId === ETH_CHAIN &&
    (cohortId.toLowerCase() ===
      '0xCADcA4d47828b74b3ab48a9F1f3cA30e70C850b7'.toLowerCase() ||
      cohortId.toLowerCase() ===
        '0x34e823351A0F0148819cF0602ec6Eead803d5461'.toLowerCase())
  ) {
    return [16, 250];
  } // UFARM -CTR Farm
  else if (
    chainId === ETH_CHAIN &&
    cohortId.toLowerCase() === '0xeee8901f7152C7337664E89B5e829c12Aa341CAb'.toLowerCase()
  ) {
    return [60, 400];
  } // ORO-WETH Farm
  else if (
    chainId === POLYGON_CHAIN &&
    cohortId.toLowerCase() === '0xc813B7537ee15b7153d1DAf1809E75629F32aA85'.toLowerCase()
  ) {
    return [20, 250];
  } // UFARM-BUSD farm
  else if (
    chainId === BSC_CHAIN &&
    cohortId.toLowerCase() === '0x7285F2d898682B41549d6391F2115D048dC19fAB'.toLowerCase()
  ) {
    return [20, 200];
  } else if (
    chainId === BSC_CHAIN &&
    cohortId.toLowerCase() === STARTFI_SPECIAL.toLowerCase()
  ) {
    return [143, 144];
  } else if (
    chainId === BSC_CHAIN &&
    cohortId.toLowerCase() === '0x98fb0590E45A2c0Fd7D65962F27e007a8Cd8af88'.toLowerCase()
  ) {
    return [20, 250];
  }
  return [36, 250];
};

export const getLatestProxyAddress = (proxies: string[]): string | null => {
  if (isEmpty(proxies)) return null;
  return proxies[proxies.length - 1];
};

export const getProxyInstance = (proxyAddress: string): Contract => {
  if (!proxyAddress) return null;
  const provider = getDefaultRPCProvider();
  return new Contract(proxyAddress, CohortProxy, provider);
};

export const getProxyUnstakeStatus = async (
  chainId: number,
  instance: Contract,
  account: string,
  stakeId: number
): Promise<boolean> => {
  if (!instance || !account || !stakeId) return null;
  var unStakeStatus: boolean;
  if (
    chainId === ETH_CHAIN &&
    (instance.address.toLowerCase() === V1PROXY.toLowerCase() ||
      instance.address.toLowerCase() === V2PROXY.toLowerCase() ||
      instance.address.toLowerCase() === V3PROXY.toLowerCase())
  ) {
    unStakeStatus = await instance.unstakeStatus(account, stakeId);
  } else if (
    chainId === ETH_CHAIN &&
    instance.address.toLowerCase() === V1REPROXY.toLowerCase()
  ) {
    unStakeStatus = await instance.u1UnstakeStatus(account, stakeId);
  } else if (
    chainId === ETH_CHAIN &&
    instance.address.toLowerCase() === V2REPROXY.toLowerCase()
  ) {
    unStakeStatus = await instance.u2UnstakeStatus(account, stakeId);
  } else if (
    chainId === ETH_CHAIN &&
    instance.address.toLowerCase() === V2REPROXY_UPGRADE.toLowerCase()
  ) {
    unStakeStatus = await instance.u2ReproxyUnstakeStatus(account, stakeId);
  } else if (
    chainId === ETH_CHAIN &&
    (instance.address.toLowerCase() === V3REPROXY.toLowerCase() ||
      instance.address.toLowerCase() === V3REPROXY_UPGRADE.toLowerCase())
  ) {
    unStakeStatus = await instance.u3UnstakeStatus(account, stakeId);
  } else {
    unStakeStatus = await instance.unStakeStatus(account, stakeId);
  }

  return unStakeStatus;
};

export const getBlockNumber = async (): Promise<number> => {
  const provider = getDefaultRPCProvider();
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

export const getBlock = async (): Promise<Block> => {
  const provider = getDefaultRPCProvider();
  const blockNumber = getBlockNumber();
  const block = await provider.getBlock(blockNumber);
  return block;
};

export const getUnifarmToken = async () => {
  try {
    const unifarm = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x40986a85b4cfcdb054a6cbfb1210194fee51af88&vs_currencies=usd&include_market_cap=true`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return unifarm.data[UNIFARM_MAINNET];
  } catch (err) {
    console.log(`Errored, ${err.message}`);
  }
};

export const getOneDayRewards = (
  stakedAmount: number,
  totalStaking: number,
  oneDayRewards: string[],
  rewardSequence: RewardToken[]
): number[] => {
  var computedDayRewards = [] as number[];
  for (var q = 0; q < oneDayRewards.length; q++) {
    const decimals = rewardSequence[q].decimals;
    const parseReward = unitFormatter(oneDayRewards[q], decimals);
    computedDayRewards.push(_.multiply(parseReward, stakedAmount) / totalStaking);
  }
  return computedDayRewards;
};

export const getNftId = (
  query: string,
  id: string
): number => {
  // filter by &
  let querySplit = query.split("&");

  for (let i = 0; i < querySplit.length; i++) {
    let pair = querySplit[i].split("=");
    if(pair[0] == id) { return Number(pair[i]); }
  }

  return 0;
}