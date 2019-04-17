import { gql } from 'apollo-server-koa';

export const event = gql`
  type Event {
    event_name: String
    event_id: ID!
    time: String
    event_url: String
  }
`;
