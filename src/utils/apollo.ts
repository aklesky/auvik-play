import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

if (!process.browser) {
  global.fetch = fetch;
}

export const client = (isBrowser = true) =>
  new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: true,
    link: createHttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache().restore(
      typeof window !== 'undefined' ? window.__APOLLO_STATE__ : null
    )
  });
