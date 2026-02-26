import { ApolloClient, InMemoryCache } from "@apollo/client";

const UNIFARM_GRAPH_ENDPOINT = process.env.REACT_APP_UNIFARM_GRAPHQL_URI;

if (UNIFARM_GRAPH_ENDPOINT === undefined) {
  throw new Error(`Please pass UNIFARM_GRAPH_ENDPOINT to run this app.`);
}

export const client = new ApolloClient({
  uri: UNIFARM_GRAPH_ENDPOINT,
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
