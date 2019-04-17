import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import { isProduction } from 'config/env';
import Koa from 'koa';
import { Resolvers } from 'server/resolvers';
import { Schema, Types } from 'server/schema';
import { logger } from 'server/utils/logger';
import { onReceive } from 'server/data/subscription';

const schema = makeExecutableSchema({
  typeDefs: [...Schema, ...Types],
  resolvers: [...Resolvers]
});

export const withApollo = () => (app: Koa) => {
  const server = new ApolloServer({
    schema,
    playground: !isProduction,
    introspection: !isProduction,
    subscriptions: {
      onConnect: (_, ws) => {
        logger.info('Connected to graphql subscriptions');
        ws.onmessage = onReceive
      },

      onDisconnect: () => {
        logger.info('Disconnected from graphql subscriptions');
      }
    }
  });

  server.applyMiddleware({ app });
  return server;
};
