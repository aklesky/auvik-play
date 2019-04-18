import { gql } from 'apollo-server-koa';

export const venue = gql`
  type Venue {
    venue_name: String
    lon: String
    lat: String
    venue_id: ID!
  }
`;
