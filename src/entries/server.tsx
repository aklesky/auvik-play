import { Universal } from '@/app';
import { theme } from '@/theme';
import { ApolloClient } from 'apollo-client';
import React from 'react';
import { StaticRouter } from 'react-router';

export const staticApp = (client: ApolloClient<any>, path?: string) => (
  <StaticRouter location={path}>
    <Universal theme={theme} client={client} />
  </StaticRouter>
);
