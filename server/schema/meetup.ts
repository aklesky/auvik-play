import { gql } from 'apollo-server-koa';
import { event } from './event';
import group from './group';
import { venue } from './venue';

export const meetup = gql`
  type Meetup {
    rsvp_id: ID!
    mtime: Int
    response: String
    guests: Int
    visibility: String
    venue: Venue
    event: Event
    group: Group
  }
`;

export default () => [meetup, event, group, venue];
