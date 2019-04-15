import { publicPath } from 'config/paths';
import client from 'config/webpack/client';
import koaWebpack from 'koa-webpack';
import webpack from 'webpack';
import { appWithWebpackMiddleware } from './koa';

const compiler = webpack(client);

const middleware = koaWebpack({
  compiler,
  config: {
    watch: false,
  },
  devMiddleware: {
    publicPath,
    writeToDisk: true
  },
  hotClient: {
    reload: true,
  }
});

appWithWebpackMiddleware(middleware);
