import { meetupUri } from 'config/env';
import { logger } from 'server/utils/logger';
import ws from 'ws';

let client = null;

export const initMeetupConnection = (url?: string, _since?: number) => (
  callback?: (event: { data: ws.Data; type: string; target: ws }) => void
): ws => {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 1);
    const meetup = new ws(`${url}?since_mtime=${fromDate.getTime()}`);
    meetup.onopen = () => {
      logger.info('Connection to Stream is established');
    };
    meetup.onerror = e => {
      logger.error(e.message);
    };

    meetup.onclose = state => {
      logger.info(`Connection close state: code: ${state.code}, was clean: ${state.wasClean}`);
    };

    if (typeof callback !== 'undefined') {
      meetup.onmessage = callback;
    }
    return meetup;
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};

export const getMeetupClient = () => {
  if (!client) {
    client = initMeetupConnection(meetupUri);
  }
  return client;
};
