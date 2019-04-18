import { IMeetup } from '@/interfaces';
import { localizedDate } from '@/utils/date';
import { Channels, EventTypes } from '@/utils/enums';
import { PubSub } from 'apollo-server-koa';
import { logger, SubscriptionLog } from 'server/utils/logger';
import Websocket from 'ws';
import { getMeetupClient } from './meetup';
export let pubsub = new PubSub();

export const onPushMeetups = (ws: { data: Websocket.Data; type: string; target: Websocket }) => {
  try {
    const data = JSON.parse(ws.data.toString()) as IMeetup;
    pubsub.publish(Channels.Meetups, {
      Meetups: {
        ...data,
        event: {
          ...data.event,
          friendly_date: data.event.time
            ? localizedDate(parseInt(data.event.time.toString(), 0))
            : null
        }
      }
    });
  } catch (e) {
    logger.error(e.message);
    SubscriptionLog(new Date().getTime(), e.message);
  }
};

export const onReceive = (response: { data: Websocket.Data; type: string; target: Websocket }) => {
  const message = JSON.parse(response.data.toString());
  let info = null;
  const { payload } = message;
  if (payload && payload.event) {
    if (payload.event === EventTypes.StartStream) {
      info = 'Request to start streaming Meetups';
      logger.info(info);
      SubscriptionLog(new Date().getTime(), info);
      getMeetupClient()(onPushMeetups);
    }

    if (payload.event === EventTypes.StopStream) {
      info = 'Request to stop streaming Meetups';
      logger.info(info);
      SubscriptionLog(new Date().getTime(), info);
      getMeetupClient()(ws => {
        ws.target.close();
      });
    }
  }
};
