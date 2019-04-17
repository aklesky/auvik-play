import { Channels } from '@/utils/enums';
import { pubsub } from 'server/data/subscription';

export const MeetupResolvers = {
  AppQuery: {
    Meetups: () => {
      return {
        rsvp_id: new Date().getTime()
      };
    }
  },
  AppSubscription: {
    Meetups: {
      subscribe: (_: any, { channel }) => {
        return pubsub.asyncIterator([channel || Channels.Meetups]);
      }
    }
  }
};
