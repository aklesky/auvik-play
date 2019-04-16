import { gql } from "apollo-server-koa"

export const event = gql`
  type Event {
    event_name: String
    event_id: Int
    time: Int
    event_url: String
  }
`;
