// External
import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import {
  HttpStatus,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { parse } from 'qs';

// Internal
import { AppModule } from './app.module';
import { AuthJwtGuard } from './common/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Reflector
  const reflector = app.get(Reflector);

  // Interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // Guards
  app.useGlobalGuards(new AuthJwtGuard(reflector));

  // Filters

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );

  // Express query parser (qs)
  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.set('query parser', (str: string) => parse(str));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('MDA Energy CRM API')
    .setDescription('API documentation for MDA Energy CRM')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  // Listen
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  await app.listen(port);
}

bootstrap();
