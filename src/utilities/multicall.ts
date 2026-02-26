import { isEmpty } from 'lodash';
import { DeseriallizedPool, getLatestProxyAddress } from '.';
import { aggregate, ICall, IResponse, IKeysValues } from '@makerdao/multicall';
import { multicallAddress, rpcUrls } from '../constants/chain';
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
import { ETH_CHAIN } from '../constants/chain';
import { V1, V3, ZERO_ADDRESS } from '../constants';
import { AllCohort } from '../store/application/reducer';
import { flattenDeep } from 'lodash';
import { includes } from 'lodash';

export const getCallId = (target: string, arg: string) => {
  return `TOTAL_STAKING_${target.slice(0, 5).toLowerCase()}_${arg
    .slice(0, 5)
    .toLowerCase()}`;
};

export const createMultiCall = (
  chainId: number,
  target: string,
  args: string[],
  proxyAddress: string,
  isProxy: boolean
): ICall => {
  if (!target || isEmpty(args)) {
    return;
  }
  if (
    !isProxy ||
    (chainId === ETH_CHAIN && proxyAddress.toLowerCase() === V1REPROXY.toLowerCase())
  ) {
    return {
      target,
      call: ['totalStaking(address)(uint256)', ...args],
      returns: [[getCallId(target, args[0]), (value) => value]],
    };
  }
  return {
    target,
    call: ['getTotalStaking(address)(uint256)', ...args],
    returns: [[getCallId(target, args[0]), (value) => value]],
  };
};

export const getTotalStakingMultiCall = async (
  chainId: number,
  farms: DeseriallizedPool[]
) => {
  if (isEmpty(farms)) return null;
  try {
    var calls = [] as ICall[];

    for (var m = 0; m < farms.length; m++) {
      const items = farms[m];

      var targetAddress = items.cohort.cohortId;
      const tokenId = items.token.tokenId;
      const proxies = items.cohort.proxies;

      const proxyAddress = getLatestProxyAddress(proxies);

      var isProxy = false;

      if (proxyAddress) {
        targetAddress = proxyAddress;
        isProxy = true;
      }
      const args = [tokenId];
      calls.push(createMultiCall(chainId, targetAddress, args, proxyAddress, isProxy));
    }

    const multiCallResult: IResponse = await multicall(chainId, calls);

    const results = multiCallResult.results;
    const returnValues = Object.keys(results.original).map((key) => {
      const result = results.original[key];
      return result;
    });
    return returnValues;
  } catch (err) {
    console.log(err);
  }
};

export const createMulticallForStakes = (
  chainId: number,
  target: string,
  args: string[]
): ICall => {
  if (chainId === ETH_CHAIN && target.toLowerCase() === V1.toLowerCase()) {
    return {
      target,
      call: [
        'viewStakingDetails(address)(address[],bool[],uint256[],uint256[],uint256[])',
        ...args,
      ],
      returns: [
        [`${target.toLowerCase()}_tokenAddress`, (tokenAddresses) => tokenAddresses],
        [`${target.toLowerCase()}_active`, (actives) => actives],
        [`${target.toLowerCase()}_stakeId`, (stakeIds) => stakeIds],
        [`${target.toLowerCase()}_stakedAmount`, (stakedAmount) => stakedAmount],
        [`${target.toLowerCase()}_startTime`, (startTime) => startTime],
      ],
    };
  } else if (chainId === ETH_CHAIN && target.toLowerCase() === V3.toLowerCase()) {
    return {
      target,
      call: [
        'viewStakingDetails(address)(address[],address[],bool[],uint8[],uint256[],uint256[],uint256[])',
        ...args,
      ],
      returns: [
        [
          `${target.toLowerCase()}_referralAddress`,
          (referralAddresses) => referralAddresses,
        ],
        [`${target.toLowerCase()}_tokenAddress`, (tokenAddresses) => tokenAddresses],
        [`${target.toLowerCase()}_active`, (actives) => actives],
        [`${target.toLowerCase()}_stakeOption`, (stakeOptions) => stakeOptions],
        [`${target.toLowerCase()}_stakeId`, (stakeIds) => stakeIds],
        [`${target.toLowerCase()}_stakedAmount`, (stakedAmount) => stakedAmount],
        [`${target.toLowerCase()}_startTime`, (startTime) => startTime],
      ],
    };
  } else {
    return {
      target,
      call: [
        'viewStakingDetails(address)(address[],address[],bool[],uint256[],uint256[],uint256[])',
        ...args,
      ],
      returns: [
        [
          `${target.toLowerCase()}_referralAddress`,
          (referralAddresses) => referralAddresses,
        ],
        [`${target.toLowerCase()}_tokenAddress`, (tokenAddresses) => tokenAddresses],
        [`${target.toLowerCase()}_active`, (actives) => actives],
        [`${target.toLowerCase()}_stakeId`, (stakeIds) => stakeIds],
        [`${target.toLowerCase()}_stakedAmount`, (stakedAmount) => stakedAmount],
        [`${target.toLowerCase()}_startTime`, (startTime) => startTime],
      ],
    };
  }
};

interface FormattedStakes {
  cohortId: string;
  tokenId: string;
  stakedAmount: string;
  startTime: number;
  referralAddress: string | null;
  stakeId: number;
  proxies: string[];
}

export const formatStakes = (
  multicallResult: IKeysValues,
  cohortId: string,
  proxies: string[]
) => {
  const referralAddresses = multicallResult[`${cohortId.toLowerCase()}_referralAddress`];
  const tokenAddresses = multicallResult[`${cohortId.toLowerCase()}_tokenAddress`];
  const actives = multicallResult[`${cohortId.toLowerCase()}_active`];
  const stakeIds = multicallResult[`${cohortId.toLowerCase()}_stakeId`];
  const stakedAmount = multicallResult[`${cohortId.toLowerCase()}_stakedAmount`];
  const startTime = multicallResult[`${cohortId.toLowerCase()}_startTime`];

  if (isEmpty(stakeIds)) return [];

  var activeStakes = [] as FormattedStakes[];
  for (var r = 0; r < stakeIds.length; r++) {
    const stakeId = Number(String(stakeIds[r]));
    if (actives[r]) {
      activeStakes.push({
        cohortId,
        tokenId: tokenAddresses[r],
        stakedAmount: String(stakedAmount[r]),
        startTime: Number(String(startTime[r])),
        referralAddress: isEmpty(referralAddresses) ? null : referralAddresses[r],
        stakeId,
        proxies,
      });
    }
  }

  return activeStakes;
};

const unStakeStatusProxyCalls = (
  chainId: number,
  proxyAddress: string,
  account: string,
  stakeId: number
): ICall => {
  if (
    chainId === ETH_CHAIN &&
    (proxyAddress.toLowerCase() === V1PROXY.toLowerCase() ||
      proxyAddress.toLowerCase() === V2PROXY.toLowerCase() ||
      proxyAddress.toLowerCase() === V3PROXY.toLowerCase())
  ) {
    return {
      target: proxyAddress,
      call: ['unstakeStatus(address,uint256)(bool)', account, String(stakeId)],
      returns: [[`PROXY_UNSTAKE_STATUS_${proxyAddress.toLowerCase()}_${stakeId}`]],
    };
  } else if (
    chainId === ETH_CHAIN &&
    proxyAddress.toLowerCase() === V1REPROXY.toLowerCase()
  ) {
    return {
      target: proxyAddress,
      call: ['u1UnstakeStatus(address,uint256)(bool)', account, String(stakeId)],
      returns: [[`PROXY_UNSTAKE_STATUS_${proxyAddress.toLowerCase()}_${stakeId}`]],
    };
  } else if (
    chainId === ETH_CHAIN &&
    proxyAddress.toLowerCase() === V2REPROXY.toLowerCase()
  ) {
    return {
      target: proxyAddress,
      call: ['u2UnstakeStatus(address,uint256)(bool)', account, String(stakeId)],
      returns: [[`PROXY_UNSTAKE_STATUS_${proxyAddress.toLowerCase()}_${stakeId}`]],
    };
  } else if (
    chainId === ETH_CHAIN &&
    proxyAddress.toLowerCase() === V2REPROXY_UPGRADE.toLowerCase()
  ) {
    return {
      target: proxyAddress,
      call: ['u2ReproxyUnstakeStatus(address,uint256)(bool)', account, String(stakeId)],
      returns: [[`PROXY_UNSTAKE_STATUS_${proxyAddress.toLowerCase()}_${stakeId}`]],
    };
  } else if (
    chainId === ETH_CHAIN &&
    (proxyAddress.toLowerCase() === V3REPROXY.toLowerCase() ||
      proxyAddress.toLowerCase() === V3REPROXY_UPGRADE.toLowerCase())
  ) {
    return {
      target: proxyAddress,
      call: ['u3UnstakeStatus(address,uint256)(bool)', account, String(stakeId)],
      returns: [[`PROXY_UNSTAKE_STATUS_${proxyAddress.toLowerCase()}_${stakeId}`]],
    };
  } else {
    return {
      target: proxyAddress,
      call: ['unStakeStatus(address,uint256)(bool)', account, String(stakeId)],
      returns: [[`PROXY_UNSTAKE_STATUS_${proxyAddress.toLowerCase()}_${stakeId}`]],
    };
  }
};

export const multicall = async (chainId: number, calls: ICall[]): Promise<IResponse> => {
  const results = await aggregate(calls, {
    rpcUrl: rpcUrls[chainId],
    multicallAddress: multicallAddress[chainId],
  });
  return results;
};

const getUnstakeStatusFromProxy = (
  proxies: string[],
  stakeId: number,
  callReponse: IKeysValues
): boolean => {
  if (isEmpty(proxies)) return null;
  var unStakeStatus = [] as boolean[];
  for (var t = 0; t < proxies.length; t++) {
    const proxyStatus = callReponse[
      `PROXY_UNSTAKE_STATUS_${proxies[t].toLowerCase()}_${stakeId}`
    ] as boolean;
    unStakeStatus.push(proxyStatus);
  }
  return includes(unStakeStatus, true);
};

export const getUserStakingsMulticall = async (
  chainId: number,
  cohorts: AllCohort[],
  account: string
) => {
  try {
    if (isEmpty(cohorts) || !account) return null;
    var calls = [] as ICall[];
    const args = [account];
    for (var t = 0; t < cohorts.length; t++) {
      const cohortAddress = cohorts[t].cohortAddress;
      calls.push(createMulticallForStakes(chainId, cohortAddress, args));
    }

    const multiStakes: IResponse = await multicall(chainId, calls);

    const originalResults = multiStakes.results.original;

    var stakes = [];

    for (var e = 0; e < cohorts.length; e++) {
      stakes.push(
        formatStakes(originalResults, cohorts[e].cohortAddress, cohorts[e].proxies)
      );
    }

    const flattenStakes = flattenDeep(stakes) as FormattedStakes[];

    // no stakes found
    if (isEmpty(flattenStakes)) {
      return [];
    }

    var actualActiveStakesCalls = [] as ICall[];
    for (var p = 0; p < flattenStakes.length; p++) {
      const proxies = flattenStakes[p].proxies;
      const stakeId = flattenStakes[p].stakeId;

      if (!isEmpty(proxies) && !proxies) {
        for (var w = 0; w < proxies.length; w++) {
          if (proxies[w] !== undefined) {
            actualActiveStakesCalls.push(
              unStakeStatusProxyCalls(chainId, proxies[w], account, stakeId)
            );
          }
        }
      }
    }

    // if there is no proxies available
    if (isEmpty(actualActiveStakesCalls)) {
      return flattenStakes;
    }

    const unstakeStatus: IResponse = await multicall(chainId, actualActiveStakesCalls);

    // fill actual stakes
    var actualActiveStakes = [] as FormattedStakes[];

    for (var q = 0; q < flattenStakes.length; q++) {
      const flattenStake = flattenStakes[q];

      const unStakeStatusFromProxy = getUnstakeStatusFromProxy(
        flattenStake.proxies,
        flattenStake.stakeId,
        unstakeStatus
      );
      if (!unStakeStatusFromProxy) {
        actualActiveStakes.push(flattenStake);
      }
    }

    return actualActiveStakes;
  } catch (err) {
    console.log(err);
  }
};

export const createMultiCallForBalance = (
  chainId: number,
  target: string,
  args: string[]
): ICall => {
  return {
    target,
    call: ['balanceOf(address)(uint)', ...args],
    returns: [[`${target}`, (val) => val]],
  };
};

interface FormattedBalance {
  token: string;
  balance: string;
}

export const formatBalance = (multicallResult: IKeysValues, token: string) => {
  const balance = multicallResult[`${token.toLowerCase()}`];

  var currentBalance = [] as FormattedBalance[];
  currentBalance.push({
    token,
    balance,
  });

  return currentBalance;
};

export const getMulticallBalance = async (
  chainId: number,
  tokens: string[],
  account: string
) => {
  var calls = [] as ICall[];
  const args = [account];
  for (let t = 0; t < tokens.length; t++) {
    calls.push(createMultiCallForBalance(chainId, tokens[t], args));
  }

  const multiCallBalance: IResponse = await multicall(chainId, calls);

  const originalResults = multiCallBalance.results.original;

  var balance = Object.entries(originalResults).map((e) => ({
    token: [e[0]],
    balance: e[1].toString(),
  }));

  // const flattenBalance = flattenDeep(balance) as FormattedBalance[];
  return balance;
};

export const createIDOMulticall = (IDO: string, account: string): ICall[] | null => {
  if (!IDO) return null;
  console.log('account', account);
  return [
    {
      target: IDO,
      call: ['ido()(address)'],
      returns: [['IDO']],
    },
    {
      target: IDO,
      call: ['sellToken()(address)'],
      returns: [['SELL_TOKEN']],
    },
    {
      target: IDO,
      call: ['startTime()(uint256)'],
      returns: [['START_TIME']],
    },
    {
      target: IDO,
      call: ['endTime()(uint256)'],
      returns: [['END_TIME']],
    },
    {
      target: IDO,
      call: ['purchaseCap()(uint256)'],
      returns: [['PURCHASE_CAP']],
    },
    {
      target: IDO,
      call: ['participants()(uint256)'],
      returns: [['PARTICIPANTS']],
    },
    {
      target: IDO,
      call: ['totalRaised()(uint256)'],
      returns: [['TOTAL_RAISED']],
    },
    {
      target: IDO,
      call: ['whiteList(address)(uint256,bool)', !account ? ZERO_ADDRESS : account],
      returns: [['USER_ALLOCATION'], ['USER_HAS_BUYED']],
    },
  ];
};
