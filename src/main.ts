import { NestFactory } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { parse } from 'qs';
import { appLoggerConfig } from './common/app-logger/app-logger.config';
import { AppLoggerInterceptor } from './common/app-logger/app-logger.interceptor';
import { AuthJwtGuard } from './common/auth';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create Nest app with Winston logger
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(appLoggerConfig),
  });

  // Enable CORS for frontend
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Reflector instance
  const reflector = app.get(Reflector);

  // Global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    app.get(AppLoggerInterceptor),
  );

  // Global guards
  // app.useGlobalGuards(new AuthJwtGuard(reflector));

  // Use qs parser for query strings
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('query parser', (str: string) => parse(str));

  // Start listening
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
