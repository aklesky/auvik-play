import { PubSub } from 'apollo-server-koa';
import { Messages } from './messages';
export const pubsub = new PubSub();



export const MeetupResolvers = {
  AppQuery: {
    Meetups: () => {
      return {
        rsvp_id: new Date().getTime(),
      };
    }
  },
  AppSubscription: {
    Meetups: {
      subscribe: () => {
        return pubsub.asyncIterator([Messages.push]);
      }
    }
  }
};
