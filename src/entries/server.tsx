import { Universal } from '@/app';
import { theme } from '@/theme';
import React from 'react';
import { StaticRouter } from 'react-router';

export const staticApp = (client, path?: string) => (
  <StaticRouter location={path}>
    <Universal theme={theme} client={client} />
  </StaticRouter>
);
