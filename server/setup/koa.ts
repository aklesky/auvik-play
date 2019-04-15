import cors from '@koa/cors';
import Koa from 'koa';
import compress from 'koa-compress';
import mount from 'koa-mount';
import serve from 'koa-static';

import { port } from 'config/env';
import { client, js } from 'config/paths';
import { staticWebpack, withApollo } from '../middlewares';
import { logger } from '../utils/logger';
import { router } from './router';

export const createServer = (): { app: Koa; apollo: any } => {
  const app = new Koa();

  const apollo = withApollo()(app);

  app
    .use(mount('/assets/js', serve(js, { defer: true, brotli: true, gzip: true })))
    .use(serve(client, { defer: true, brotli: true, gzip: true }))
    .use(cors());

  return {
    app,
    apollo
  };
};

export const appWithWebpackMiddleware = async middleware => {
  const { app } = createServer();
  app.use(await middleware);
  router.get('*', staticWebpack);

  app.use(router.routes());

  app.listen(port, () => {
    logger.info(`listening to port ${port}`);
  });

  return app;
};

export const appWithServerSideRendering = () => {
  const { app } = createServer();

  router.get('/', () => ({}));

  app.use(router.routes());
  app.use(compress());

  app.listen(port, () => {
    logger.info(`listening to port ${port}`);
  });
  return app;
};
