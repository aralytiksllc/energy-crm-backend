import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as qs from 'qs';
import { appLoggerConfig } from './common/app-logger/app-logger.config';
import { AppLoggerInterceptor } from './common/app-logger/app-logger.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(appLoggerConfig),
  });

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('query parser', (str: string) => qs.parse(str));

  // Interceptors
  const interceptor = app.get(AppLoggerInterceptor);
  app.useGlobalInterceptors(interceptor);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
