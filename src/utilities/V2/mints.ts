import { getYF2GraphqlClient } from '../../graphql/V2';
import { Transfer } from '../../graphql/V2/typings';
import { v2Transfer } from '../../graphql/V2/queries';

export const getUserMints = async (chainId: number, user: string) => {
  if (!user) return null;
  const client = getYF2GraphqlClient(chainId);
  const results = await client.query<{ transfers: Transfer[] }>({
    query: v2Transfer,
    variables: {
      where: {
        to: user,
      },
      first: 1000,
    },
  });
  return results.data.transfers as Transfer[];
};
