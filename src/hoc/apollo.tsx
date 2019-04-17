import React from 'react';
import { ApolloConsumer } from 'react-apollo';

export const WithApolloClient = Component => props => (
  <ApolloConsumer>{client => <Component client={client} {...props} />}</ApolloConsumer>
);
