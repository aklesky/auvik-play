import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import { isProduction } from 'config/env';
import Koa from 'koa';
import { getMeetupClient } from 'server/data/meetup';
import { onReceive } from 'server/data/subscription';
import { Resolvers } from 'server/resolvers';
import { Schema, Types } from 'server/schema';
import { logger, SubscriptionLog } from 'server/utils/logger';

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
        const message = 'Connected to graphql subscriptions';
        logger.info(message);
        SubscriptionLog(new Date().getTime(), message);
        ws.onmessage = onReceive;
      },

      onDisconnect: () => {
        getMeetupClient(false)(ws => {
          ws.target.terminate();
        });
        const message = 'Disconnected from graphql subscriptions';
        logger.info(message);
        SubscriptionLog(new Date().getTime(), message);
      }
    }
  });

  server.applyMiddleware({ app });
  return server;
};
