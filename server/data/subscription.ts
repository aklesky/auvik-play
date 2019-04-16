import { PubSub } from 'apollo-server-koa';
import { logger } from 'server/utils/logger';
import Websocket from 'ws';
export const pubsub = new PubSub();

export enum Messages {
  push = 'Meetups'
}

export const onPush = (ws: { data: Websocket.Data; type: string; target: Websocket }) => {
  const data = JSON.parse(ws.data.toString());
  logger.info(ws.data.toString());
  pubsub.publish(Messages.push, { Meetups: data });
};
