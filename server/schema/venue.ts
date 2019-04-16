import { gql } from 'apollo-server-koa';

export const venue = gql`
  type Venue {
    venue_name: String
    lon: Int
    lat: Int
    venue_id: ID!
  }
`;
