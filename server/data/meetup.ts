import { logger } from 'server/utils/logger';
import ws from 'ws';

export const initMeetupConnection = (url?: string, _since?: number): ws => {
  try {
    const meetup = new ws(url);
    meetup.onopen = () => {
      logger.info('Connection to Stream is established');
    };
    meetup.onerror = e => {
      logger.error(e.message);
    };

    meetup.onclose = state => {
      logger.info(`Connection close state: code: ${state.code}, was clean: ${state.wasClean}`);
    };
    return meetup;
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};
