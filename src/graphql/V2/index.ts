import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

interface GraphUrl {
  [chainId: number]: string;
}

const endpoints: GraphUrl = {
  4: 'https://api.studio.thegraph.com/query/2571/unifarmm/0.0.2',
  97: null,
  80001: null,
  43113: null,
};

export const getYF2GraphqlClient = (
  chainId: number
): ApolloClient<NormalizedCacheObject> | null => {
  const endpoint = endpoints[chainId];
  if (!endpoint) return null;
  return new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies: {
        Query: {
          fields: {
            ALL_POOLS: {
              keyArgs: false,
              merge: (existing = [], incoming) => {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
};
