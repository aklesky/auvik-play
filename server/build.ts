import client from 'config/webpack/client';
import server from 'config/webpack/server';
import { logger } from 'server/utils/logger';
import webpack from 'webpack';

const compile = webpack([client, server]);

compile.run((_, stats) => console.log(stats.toJson()));

compile.plugin('done', () => {
  logger.warn('Clearing /client/ module cache from server');
  Object.keys(require.cache).forEach(id => {
    if (/[\/\\]client[\/\\]/.test(id)) {
      delete require.cache[id];
    }
  });
});
