import { localizedDate } from '@/utils/date';
import { Channels } from '@/utils/enums';
import { isProduction } from 'config/env';
import { log, logs } from 'config/paths';
import fs from 'fs';
import { TransformableInfo } from 'logform';
import { pubsub } from 'server/data/subscription';
import { createLogger, format, transports } from 'winston';

if (!fs.existsSync(logs)) {
  fs.mkdirSync(logs);
}

const simple = (info: TransformableInfo) => `[${info.timestamp}]${info.level}: ${info.message}`;

export const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.simple(),
    format.printf(simple)
  ),
  transports: [
    new transports.Stream({
      stream: fs.createWriteStream(log.error),
      level: 'error'
    }),
    new transports.Stream({
      stream: fs.createWriteStream(log.info)
    })
  ]
});

if (!isProduction) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple(), format.printf(simple))
    })
  );
}

export const SubscriptionLog = (time: number, message: string) => {
  if (!pubsub) {
    return null;
  }
  pubsub.publish(Channels.Logs, {
    Logs: {
      time: localizedDate(time),
      message
    }
  });
};
