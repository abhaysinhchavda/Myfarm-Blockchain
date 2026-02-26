# UniFarm — Multi-Chain DeFi Staking Platform (MyFarm Blockchain)

A decentralized finance (DeFi) staking dashboard that enables users to stake tokens, earn rewards, swap tokens, provide liquidity, and participate in governance across multiple blockchain networks.

## Features

- **Multi-Chain Support** — Ethereum, BSC, Polygon, Avalanche
- **Token Staking** — Stake tokens in cohort-based farming pools with APY tracking
- **Token Swaps** — Integrated DEX aggregator for seamless token swaps
- **Liquidity Pools** — Add/remove liquidity with impermanent loss monitoring
- **Governance** — On-chain proposal creation and voting
- **Portfolio Dashboard** — Real-time portfolio value, rewards earned, and transaction history
- **Wallet Integration** — MetaMask, WalletConnect, Coinbase Wallet support

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Frontend      | React 17, TypeScript                |
| State Mgmt    | Redux Toolkit, React Query          |
| Blockchain    | ethers.js, Web3Modal                |
| Data          | The Graph (GraphQL subgraphs)       |
| Styling       | Styled Components, Material UI      |
| Build         | Webpack 5, Babel                    |
| Testing       | Jest, React Testing Library         |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Staking/      # Staking pool cards and modals
│   ├── Swap/         # Token swap interface
│   ├── Liquidity/    # LP management
│   └── Governance/   # Proposal list and voting
├── contracts/        # ABI files and contract addresses
├── hooks/            # Custom hooks (useStaking, useSwap, useWallet)
├── pages/            # Route-level page components
├── redux/            # Redux slices and store config
├── services/         # API and blockchain service layers
├── subgraphs/        # GraphQL queries for The Graph
├── utils/            # Helpers, formatters, constants
└── App.tsx           # Root component with router
```

## Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn
- MetaMask browser extension

### Installation

```bash
git clone https://github.com/abhaysinhchavda/Myfarm-Blockchain.git
cd Myfarm-Blockchain
npm install
```

### Environment Variables

Create a `.env` file:

```env
REACT_APP_INFURA_KEY=your_infura_key
REACT_APP_CHAIN_ID=1
REACT_APP_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/...
```

### Run Development Server

```bash
npm start
```

App will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

## Supported Networks

| Network   | Chain ID | Status |
|-----------|----------|--------|
| Ethereum  | 1        | ✅      |
| BSC       | 56       | ✅      |
| Polygon   | 137      | ✅      |
| Avalanche | 43114    | ✅      |

## License

MIT
