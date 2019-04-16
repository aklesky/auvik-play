import { PubSub } from 'apollo-server-koa';
import { Messages } from './messages';
const pubsub = new PubSub();



export const MeetupResolvers = {
  AppQuery: {
    Meetups: () => {
      setInterval(() => {
        pubsub.publish(Messages.push, {  Meetups: {rsvp_id: new Date().getTime()} });
      }, 10000);
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
