import { client } from "../graphql";
import {
  AllPools,
  AllReferredUserResponse,
  GET_ALL_REFFERED_USER,
  SPECIFIC_UNSTAKES,
  Unstakes,
} from "../graphql/queries";
import { GET_SPECFIC_POOLS } from "../graphql/queries";

export const getSpecficPools = async (
  chainId: number,
  cohorts: string[],
  tokens: string[]
): Promise<AllPools[]> => {
  const specficPools = await client.query<{ getSpecficPools: AllPools[] }>({
    query: GET_SPECFIC_POOLS,
    variables: {
      where: {
        chainId,
        cohorts,
        tokens,
      },
    },
  });
  return specficPools.data.getSpecficPools;
};

export const getReferedUsers = async (
  chainId: number,
  account: string
): Promise<AllReferredUserResponse> => {
  const referralUsers = await client.query<AllReferredUserResponse>({
    query: GET_ALL_REFFERED_USER,
    variables: {
      where: {
        chainId,
        userAddress: account,
      },
      getReferralClaimByUserWhere2: {
        chainId,
        userAddress: account,
      },
    },
  });
  return referralUsers.data;
};

export const getSpecificUnstakes = async (
  chainId: number,
  accounts: string[]
): Promise<{ getSpecficUnstakes: Unstakes[] }> => {
  const specificUnstakes = await client.query<{
    getSpecficUnstakes: Unstakes[];
  }>({
    query: SPECIFIC_UNSTAKES,
    variables: {
      where: {
        chainId,
        userAddresses: accounts,
      },
    },
  });
  return specificUnstakes.data;
};
