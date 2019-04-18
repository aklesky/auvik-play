import { meetupUri } from 'config/env';
import { logger, SubscriptionLog } from 'server/utils/logger';
import ws from 'ws';

let client = null;

export const initMeetupConnection = (url?: string, _since?: number): ws => {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 1);
    const meetup = new ws(`${url}?since_mtime=${fromDate.getTime()}`);

    meetup.onopen = () => {
      const message = 'Connection to Stream is established';
      logger.info(message);
      SubscriptionLog(new Date().getTime(), message);
    };
    meetup.onerror = e => {
      logger.error(e.message);
    };

    meetup.onclose = state => {
      const message = `Connection close state: code: ${state.code}, was clean: ${state.wasClean}`;
      logger.info(message);
      SubscriptionLog(new Date().getTime(), message);
      client = null;
    };
    return meetup;
  } catch (e) {
    logger.error(e.message);
    SubscriptionLog(new Date().getTime(), e.message);
    return e.message;
  }
};

export const getMeetupClient = (initConnection = true) => (
  callback?: (event: { data: ws.Data; type: string; target: ws }) => void
): ws => {
  if (!client && initConnection) {
    client = initMeetupConnection(meetupUri);
  }
  if (client && callback) {
    client.onmessage = callback;
  }
  return client;
};
