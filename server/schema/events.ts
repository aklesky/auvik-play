import { gql } from 'apollo-server-koa';

export const events = gql`
  type Events {
    event_id: ID!
  }
`;
