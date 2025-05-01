import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { appLoggerConfig } from './app-logger.config';
import { AppLoggerService } from './app-logger.service';
import { AppLoggerInterceptor } from './app-logger.interceptor';

@Global()
@Module({
  imports: [WinstonModule.forRoot(appLoggerConfig)],
  providers: [AppLoggerService, AppLoggerInterceptor],
  exports: [AppLoggerService, AppLoggerInterceptor],
})
export class AppLoggerModule {}
