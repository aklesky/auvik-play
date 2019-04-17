import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import { isProduction } from 'config/env';
import Koa from 'koa';
import { getMeetupClient } from 'server/data/meetup';
import { onReceive } from 'server/data/subscription';
import { Resolvers } from 'server/resolvers';
import { Schema, Types } from 'server/schema';
import { logger } from 'server/utils/logger';

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
        ws.onmessage = onReceive;
      },

      onDisconnect: () => {
        getMeetupClient(false)(ws => {
          ws.target.terminate();
        });
        logger.info('Disconnected from graphql subscriptions');
      }
    }
  });

  server.applyMiddleware({ app });
  return server;
};
