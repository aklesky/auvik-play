import { gql } from 'apollo-server-koa';

const queries = gql`
  type AppQuery {

  }
`;

const schema = gql`
  schema {
    query: AppQuery
  }
`;

export const Schema = [schema, queries];

export const Types = [];
