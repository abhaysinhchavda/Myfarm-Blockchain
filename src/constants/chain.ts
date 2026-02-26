// dedicated chain configuration
import EthereumLogo from "../assets/images/others/eth.svg";
import BinanceChainLogo from "../assets/images/others/bn.svg";
import PolygonLogo from "../assets/images/others/polygon.svg";
import AVE from "../assets/images/Ave.png";

// ETH RPC url
export const ethRpcUrl = process.env.REACT_APP_RINKEBY_RPC_URL;
// BSC RPC url
export const bscRpcUrl = process.env.REACT_APP_BSC_TESTNET_RPC_URL;
// POLYGON RPC url
export const polygonRpcUrl = process.env.REACT_APP_POLYGON_MUMBAI_RPC_URL;

export const avaxRpcUrl = process.env.REACT_APP_AVAX_RPC_URL;

if (
  ethRpcUrl === undefined ||
  bscRpcUrl === undefined ||
  polygonRpcUrl === undefined ||
  avaxRpcUrl === undefined
) {
  throw new Error(`You may need JSON RPC url to run this app.`);
}

interface RPC {
  [chainId: number]: string;
}

interface Network {
  [chainId: number]: string;
}

interface Explolers {
  [chainId: number]: string;
}

export const ETH_CHAIN = 4;
export const BSC_CHAIN = 97;
export const POLYGON_CHAIN = 80001;
export const AVAX_CHAIN = 43113;

export const rpcUrls: RPC = {
  4: ethRpcUrl,
  97: bscRpcUrl,
  80001: polygonRpcUrl,
  43113: avaxRpcUrl,
};

export const NETWORK: Network = {
  4: "ETHEREUM RINKEBY",
  97: "BSC TESTNET",
  80001: "POLYGON MUMBAI",
  43113: "Avalanche Testnet",
};

export const explolers: Explolers = {
  4: "https://rinkeby.etherscan.io",
  97: "https://testnet.bscscan.com",
  80001: "https://mumbai.polygonscan.com",
  43113: "https://testnet.snowtrace.io",
};

export interface NetworkDetails {
  name: string;
  icon: string;
  chainId: number;
}

export interface Networks {
  [chainId: number]: NetworkDetails;
}

export const networks: Networks = {
  4: {
    name: "Ethereum",
    icon: EthereumLogo,
    chainId: 4,
  },
  97: {
    name: "Binance",
    icon: BinanceChainLogo,
    chainId: 97,
  },
  80001: {
    name: "Polygon",
    icon: PolygonLogo,
    chainId: 80001,
  },
  43113: {
    name: "Avalanche",
    icon: AVE,
    chainId: 43113,
  },
};

export const chainConfig = {
  97: [
    {
      chainId: "0x61",
      chainName: "BSC TESTNET",
      nativeCurrency: {
        name: "BNB Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
      iconUrls: [
        "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/bnb.png",
      ],
    },
  ],
  80001: [
    {
      chainId: "0x13881",
      chainName: "POLYGON TESTNET",
      nativeCurrency: {
        name: "POLYGON",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.matic.today"],
      blockExplorerUrls: ["https://polygon-explorer-mumbai.chainstacklabs.com"],
      iconUrls: [
        "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/matic.png",
      ],
    },
  ],
  43113: [
    {
      chainId: "0xA869",
      chainName: "Avalanche FUJI C-Chain",
      nativeCurrency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
      },
      rpcUrls: [
        "https://speedy-nodes-nyc.moralis.io/c7ca0503d23c1281dce4657c/avalanche/testnet",
      ],
      blockExplorerUrls: ["https://testnet.snowtrace.io/"],
      iconUrls: [
        "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/avax.png",
      ],
    },
  ],
};

export const legacyAppUrls = {
  4: "https://dev.app.unifarm.co/",
  97: "https://dev.bsc.unifarm.co/",
  80001: "https://dev.matic.unifarm.co/",
  43113: "https://dev.avax.unifarm.co/",
};

export const multicallAddress = {
  4: "0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821",
  97: "0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C",
  80001: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc",
  43113: "0x3D015943d2780fE97FE3f69C97edA2CCC094f78c",
};


export const ChainId = {
  // MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
  DEVNET: 444800,
  AUTONITY: 444900,
  PARASTATE: 123,
  GANCHE: 1337
};

export const routerAddress = new Map();
routerAddress.set(ChainId.ROPSTEN, "0xbA09E5754556f30eC5C9cf4c1b2A79F5D9058497");
routerAddress.set(ChainId.RINKEBY, "0xbA09E5754556f30eC5C9cf4c1b2A79F5D9058497");
routerAddress.set(ChainId.GÖRLI, "0xbA09E5754556f30eC5C9cf4c1b2A79F5D9058497");
routerAddress.set(ChainId.KOVAN, "0xbA09E5754556f30eC5C9cf4c1b2A79F5D9058497");
routerAddress.set(ChainId.DEVNET, "0x04e555283D37aE85F6eB311fe2578F3B3f3dFc52");
routerAddress.set(ChainId.AUTONITY, "0x04e555283D37aE85F6eB311fe2578F3B3f3dFc52");
routerAddress.set(ChainId.PARASTATE, "0x07a1905D44feeA439ceFAabd11a63bEf684abE11");
routerAddress.set(ChainId.GANCHE, "0x0F44AC51198D8F99847db6C431448dBC673428f1");
// 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D