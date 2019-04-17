import { Messages } from '@/utils/enums';
import { StreamRequest } from '@/utils/enums';
import { PubSub } from 'apollo-server-koa';
import { logger } from 'server/utils/logger';
import Websocket from 'ws';
import { getMeetupClient } from './meetup';
export let pubsub = new PubSub();

export const onPush = (ws: { data: Websocket.Data; type: string; target: Websocket }) => {
  const data = JSON.parse(ws.data.toString());
  pubsub.publish(Messages.push, { Meetups: data });
};

export const onReceive = (response: { data: Websocket.Data; type: string; target: Websocket }) => {
  const message = JSON.parse(response.data.toString());
  if (message.type === StreamRequest.start) {
    logger.info('Request to start streaming Meetups');
    getMeetupClient()(onPush);
  }
  if (message.type === StreamRequest.stop) {
    logger.info('Request to stop streaming Meetups');
    getMeetupClient()(ws => {
      ws.target.close();
    });
  }
};
