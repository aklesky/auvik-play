import { gql } from 'apollo-server-koa';
import meetup from './meetup';

const queries = gql`
  type AppQuery {
    Meetups: Meetup
  }

  type AppSubscription {
    Meetups: Meetup
  }
`;

const schema = gql`
  schema {
    query: AppQuery
    subscription: AppSubscription
  }
`;

export const Schema = [schema, queries];

export const Types = [meetup];
