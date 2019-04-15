import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import { isProduction } from 'config/env';
import Koa from 'koa';
import { Resolvers } from 'server/resolvers';
import { Schema, Types } from 'server/schema';

const schema = makeExecutableSchema({
  typeDefs: [...Schema, ...Types],
  resolvers: [...Resolvers]
});

export const withApollo = () => (app: Koa) => {
  const server = new ApolloServer({
    schema,
    playground: !isProduction,
    introspection: !isProduction
  });


  server.applyMiddleware({ app });
  return server;
};
