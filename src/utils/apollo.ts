import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'isomorphic-unfetch';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import ws from 'ws';

if (!process.browser) {
  global.fetch = fetch;
}

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  );

let websocketClient = null;

export const getWebsocketClient = (uri?: string, isBrowser?: boolean) => {
  if (!websocketClient) {
    websocketClient = new WebSocketLink(
      new SubscriptionClient(
        `ws://${uri}`,
        {
          reconnect: true
        },
        !isBrowser ? ws : null
      )
    );
  }
  return websocketClient;
};

export const getSubscriptionClient = () => {
  const { subscriptionClient } = getWebsocketClient();
  return subscriptionClient;
};

export const apolloClient = (isBrowser = true, url?: string) => {
  const uri = url || process.env.APOLLO || null;

  const httpClient = createHttpLink({
    uri: `http://${uri}`,
    fetch
  });

  const link = ApolloLink.split(
    hasSubscriptionOperation,
    getWebsocketClient(uri, isBrowser),
    httpClient
  );

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: true,
    link,
    cache: new InMemoryCache().restore(
      typeof window !== 'undefined' ? window.__APOLLO_STATE__ : null
    )
  });
};
