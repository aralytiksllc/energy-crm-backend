import { utilities } from 'nest-winston';
import * as winston from 'winston';

export const appLoggerConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike('App', {
          prettyPrint: true,
        }),
      ),
    }),
  ],
};
