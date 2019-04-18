import { Channels } from '@/utils/enums';
import { pubsub } from 'server/data/subscription';

export const LogResolvers = {
  AppSubscription: {
    Logs: {
      subscribe: () => {
        return pubsub.asyncIterator([Channels.Logs]);
      }
    }
  }
};
