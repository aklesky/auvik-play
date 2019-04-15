import { PubSub } from 'apollo-server-koa';
import { Messages } from './messages';
const pubsub = new PubSub();



export const EventsResolvers = {
  AppQuery: {
    getEvents: () => {
      setInterval(() => {
        pubsub.publish(Messages.push, {  Events: {event_id: new Date().getTime()} });
      }, 10000);
      return {
        event_id: new Date().getTime(),
      };
    }
  },
  AppSubscription: {
    Events: {
      subscribe: () => {
        return pubsub.asyncIterator([Messages.push]);
      }
    }
  }
};
