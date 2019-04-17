import { PubSub } from 'apollo-server-koa';
import Websocket from 'ws';
import { Messages } from '@/utils/enums';
import { StreamRequest } from '@/utils/enums';
import { logger } from 'server/utils/logger';
export let pubsub = new PubSub();



export const onPush = (ws: { data: Websocket.Data; type: string; target: Websocket }) => {
  const data = JSON.parse(ws.data.toString());
  pubsub.publish(Messages.push, { Meetups: data });
};

export const onReceive = (ws: { data: Websocket.Data; type: string; target: Websocket }) => {
  const message = JSON.parse(ws.data.toString());
  if (message.type === StreamRequest.start) {
    logger.info('Request to start streaming Meetups');
  }
  if (message.type === StreamRequest.stop) {
    logger.info('Request to stop streaming Meetups');
  }
};
