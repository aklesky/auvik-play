import cors from '@koa/cors';
import { port } from 'config/env';
import { client, js } from 'config/paths';
import Koa from 'koa';
import compress from 'koa-compress';
import mount from 'koa-mount';
import serve from 'koa-static';
import { staticWebpack, withApollo, useServerSideRendering } from 'server/middlewares';
import { logger } from 'server/utils/logger';
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
  const { app, apollo } = createServer();
  app.use(await middleware);
  router.get('*', staticWebpack);

  app.use(router.routes());

  const server = app.listen(port, () => {
    logger.info(`listening to port ${port}`);
  });

  apollo.installSubscriptionHandlers(server);

  return app;
};

export const appWithServerSideRendering = () => {
  const { app, apollo } = createServer();

  router.get('/', useServerSideRendering);

  app.use(router.routes());
  app.use(compress());

  const server = app.listen(port, () => {
    logger.info(`listening to port ${port}`);
  });
  apollo.installSubscriptionHandlers(server);

  return app;
};
