import { injected, walletconnect } from '../connectors';
import { AbstractConnector } from '@web3-react/abstract-connector';
import MetaMaskIcon from '../assets/images/connectors/meta2.svg';
import WalletConnectLogo from '../assets/images/connectors/wallet2.svg';
import { unitParser } from '../utilities';

interface Wallet {
  [connetorName: string]: {
    name: string;
    logoUri: string;
    connector: (chainId: number) => AbstractConnector;
    isMobileSupported: boolean;
    depiction: string;
  };
}

interface Hotpool {
  chainId: number;
  tokenId: string;
  cohortId: string;
}

export const wallets: Wallet = {
  METAMASK: {
    name: 'Metamask',
    logoUri: MetaMaskIcon,
    connector: (chainId: number) => {
      return injected(chainId);
    },
    isMobileSupported: false,
    depiction: 'Chrome Extension Trusted By 10 Million Users.',
  },
  WALLETCONNECT: {
    name: 'Wallet Connect',
    logoUri: WalletConnectLogo,
    connector: (chainId: number) => {
      return walletconnect(chainId);
    },
    isMobileSupported: true,
    depiction: 'Using Trust Wallet & Rainbow Wallet',
  },
};

export const COINGECOKO_BASE_URI: string =
  'https://api.coingecko.com/api/v3/simple/token_price/ethereum';

export const unifarmAddress = {
  4: '0xf7745D2e7FdE51c542568F718457d983F761e8C3',
  97: '0x19e90b5888C44F0bF50F19B2842A8937C78C9688',
  80001: '0xa1C5949Ec64b4d81B2BE69356BeAfe529F774FE5',
  43113: '0x4eBf6Ed5DAcfa34BeE0db8F99Dd9bBEE62597e5a',
};

export const unifarmNFTManagerAddress = {
  4: '0x4fE1371E342199D1743112a3aFee327a6E3FeDDF',
  97: '',
  80001: '',
  43113: '',
};

export const POOL_FETCHED_LIMIT = 30;

export const Theme: string = 'red';

export const ButtonColor: string = 'Blue';

export const UNIFARM_MAINNET: string = '0x40986a85b4cfcdb054a6cbfb1210194fee51af88';

export const STARTFI_SPECIAL: string = '0xD318250e089D551e6A5734193a015C0D331D47C8';

export const DEFAULT_APP_CHAIN: number = 4;

export const DEFAULT_STAKE_USD_AMOUNT: number = 100;

export const DEFAULT_REFFERAL_ADDRESS: string =
  '0x0000000000000000000000000000000000000000';

export const ZERO_ADDRESS: string = '0x0000000000000000000000000000000000000000';

export const INFINITE_AMOUNT = unitParser('1000000000000000');

export const GAS_MARGIN = 10;

export const YEAR = 360;

export const V1: string = '0x082bE801D9f4dd195Ac3328AbdEDF4cE23b9fef4';
export const V2: string = '0x0E148d2A9c0d1DbE7ee3B4772D31289c0098012F';
export const V3: string = '0xf7cc8bf44289f6b57bbf968115ea4048bbe39c0f';

export const blockedPools: string[] = [
  '0xc778417e063141139fce010982780140aa0cd5ab',
  '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
  '0xC3A967c67431BD1a2206B854E588E6D4c628999A',
  '0x0d787a4a1548f673ed375445535a6c7A1EE56180',
  '0x3f2C8358Da0D30f24a98821645595C8F0C8143bF',
];

export const hotpools: Hotpool[] = [
  {
    chainId: 4,
    tokenId: '0xA3E560F8261B7aab11ff114aB98C6056c94fa632',
    cohortId: '0x2e47fd3D73F95e1B0d20Ef07cA2E4aD15Cc092B5',
  },
  {
    chainId: 4,
    tokenId: '0xef67699222EE81F6a6Dcd0a9ba88C24d783c3b46',
    cohortId: '0x2e47fd3D73F95e1B0d20Ef07cA2E4aD15Cc092B5',
  },
  {
    chainId: 4,
    tokenId: '0xCeABE8ce0b52d5B1B978C3D53AAd21244337540f',
    cohortId: '0x2e47fd3D73F95e1B0d20Ef07cA2E4aD15Cc092B5',
  },
  {
    chainId: 4,
    tokenId: '0x55964cFECee16e751271F502172a23087D02cA0b',
    cohortId: '0x2e47fd3D73F95e1B0d20Ef07cA2E4aD15Cc092B5',
  },
  {
    chainId: 4,
    tokenId: '0xf7745D2e7FdE51c542568F718457d983F761e8C3',
    cohortId: '0x2e47fd3D73F95e1B0d20Ef07cA2E4aD15Cc092B5',
  },
  {
    chainId: 4,
    tokenId: '0xf7745D2e7FdE51c542568F718457d983F761e8C3',
    cohortId: '0x2e47fd3D73F95e1B0d20Ef07cA2E4aD15Cc092B5',
  },
  {
    chainId: 4,
    cohortId: '0x34e823351A0F0148819cF0602ec6Eead803d5461',
    tokenId: '0xf7745D2e7FdE51c542568F718457d983F761e8C3',
  },
  {
    chainId: 4,
    tokenId: '0x179Cf3CfD5eB757dC33A87Ec39d0d968A72fCA6c',
    cohortId: '0x305A83c506F7c4EDF58D7904dEC16De81ef396Cb',
  },
  {
    chainId: 97,
    tokenId: '0x4ac4dc79f4740b3107e0bb492f9dafc6f679d911',
    cohortId: '0x8e90Ae93B15634dA76D04e05B688f94bd74260aC',
  },
  {
    chainId: 97,
    tokenId: '0x19e90b5888C44F0bF50F19B2842A8937C78C9688',
    cohortId: '0x2ab62e1dc5c7df8bb01bf3cf73fa0a83384065ba',
  },
  {
    chainId: 97,
    tokenId: '0xf797f4591aAe59C7911fcc4E4ce14f881342619D',
    cohortId: '0x8e90Ae93B15634dA76D04e05B688f94bd74260aC',
  },
  {
    chainId: 97,
    tokenId: '0x959150c57A397Afd50AFc035C46A75F0DDFd9f56',
    cohortId: '0x8e90Ae93B15634dA76D04e05B688f94bd74260aC',
  },
  {
    chainId: 97,
    tokenId: '0xB1B28c6a005dfAd3D1333Eb6660A81E3c10EfB80',
    cohortId: '0x2ab62e1dc5c7df8bb01bf3cf73fa0a83384065ba',
  },
  {
    chainId: 97,
    tokenId: '0x8197b1D816544e938E58D9A4476d2E34bdd3D056',
    cohortId: '0xd54B6e5cDC11145eD4c51DC0d3E787B96F026402',
  },
  {
    chainId: 97,
    cohortId: '0x2ab62e1dc5c7df8bb01bf3cf73fa0a83384065ba',
    tokenId: '0xde69bdC14A3379e4242E0d40707872Ddfea8a75D',
  },
  {
    chainId: 97,
    tokenId: '0x541Cb6f10A37DA891ED7567e9944514fc141BECE',
    cohortId: '0x2ab62e1dc5c7df8bb01bf3cf73fa0a83384065ba',
  },
  {
    chainId: 97,
    tokenId: '0x541Cb6f10A37DA891ED7567e9944514fc141BECE',
    cohortId: '0xd54B6e5cDC11145eD4c51DC0d3E787B96F026402',
  },
];

interface LaunchPad {
  [chainId: number]: string[];
}

export const launchpads: LaunchPad = {
  97: ['0x7D15b7333Dee8719C8388a6b63E27c0370df60dA'],
};
