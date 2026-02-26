import { gql } from '@apollo/client';

export const v2FarmQuery = gql`
  query Tokens {
    tokens {
      id
      cohort {
        id
        protocolConfig {
          referralPercentage
        }
        cohortVersion
        startBlock
        endBlock
        epochBlocks
        hasLiquidityMining
        hasContainsWrappedToken
        hasCohortLockinAvaliable
        rewards
        boosters {
          bpid
          boosterPackAmount
          paymentToken
        }
      }
      fid
      farmToken
      userMinStake
      userMaxStake
      totalStakeLimit
      decimals
      skip
    }
  }
`;

export const v2Transfer = gql`
  query Transfers($where: Transfer_filter, $first: Int) {
    transfers(where: $where, first: $first) {
      id
      from
      to
      tokenId
      blockNumber
      transactionHash
      timestamp
    }
  }
`;
