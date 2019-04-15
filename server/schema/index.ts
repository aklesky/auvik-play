import { gql } from 'apollo-server-koa';
import { events } from './events';

const queries = gql`
  type AppQuery {
    getEvents: Events
  }

  type AppSubscription {
    Events: Events
  }
`;

const schema = gql`
  schema {
    query: AppQuery
    subscription: AppSubscription
  }
`;

export const Schema = [schema, queries];

export const Types = [events];
