import { Messages, pubsub } from 'server/data/subscription';

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
      subscribe: (_, { channel }) => {
        return pubsub.asyncIterator([channel || Messages.push]);
      },
    }
  }
};
