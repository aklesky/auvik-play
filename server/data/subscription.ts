import { Channels, EventTypes } from '@/utils/enums';
import { PubSub } from 'apollo-server-koa';
import { logger } from 'server/utils/logger';
import Websocket from 'ws';
import { getMeetupClient } from './meetup';
export let pubsub = new PubSub();

export const onPushMeetups = (ws: { data: Websocket.Data; type: string; target: Websocket }) => {
  const data = JSON.parse(ws.data.toString());
  pubsub.publish(Channels.Meetups, {
    Meetups: {
      ...data,
      event: {
        ...data.event,
        time: Intl.DateTimeFormat('en-DE', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit'
        }).format(parseInt(data.event.time, 0))
      }
    }
  });
};

export const onReceive = (response: { data: Websocket.Data; type: string; target: Websocket }) => {
  const message = JSON.parse(response.data.toString());

  const { payload } = message;
  if (payload && payload.event) {
    if (payload.event === EventTypes.StartStream) {
      logger.info('Request to start streaming Meetups');
      getMeetupClient()(onPushMeetups);
    }

    if (payload.event === EventTypes.StopStream) {
      logger.info('Request to stop streaming Meetups');
      getMeetupClient()(ws => {
        ws.target.close();
      });
    }
  }
};
