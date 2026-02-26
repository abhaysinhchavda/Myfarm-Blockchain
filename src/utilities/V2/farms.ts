import { formatFarmTokenDetails } from '.';
import { isEmpty } from '..';
import { getYF2GraphqlClient } from '../../graphql/V2';
import { v2FarmQuery } from '../../graphql/V2/queries';
import { Token } from '../../graphql/V2/typings';
import { CohortYF2, TokenMetaDataYF2 } from './types';

export const getYF2FarmDetails = async (
  chainId: number
): Promise<{ cohort: CohortYF2; token: TokenMetaDataYF2 }[]> => {
  const client = getYF2GraphqlClient(chainId);
  if (!client) return null;
  const response = await client.query<{ tokens: Token[] }>({
    query: v2FarmQuery,
  });
  if (response.data) {
    let farms = response.data.tokens as Token[];
    if (!isEmpty(farms)) {
      return farms.map((farmItems) => {
        return formatFarmTokenDetails(farmItems);
      });
    }
  }
};
