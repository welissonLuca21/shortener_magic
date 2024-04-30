import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swagger } from '@config/swagger.config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { json } from 'express';
import * as Sentry from '@sentry/node';
import { SentryFilter } from '@shared/interceptors/exception-filter.interceptor';
import { ENVS } from '@config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
    bufferLogs: true,
  });

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  app.use(cors());

  app.use(json({ limit: '200mb' }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  SwaggerModule.setup('docs', app, swagger(app), {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(ENVS.APP_PORT || 3000);
}
bootstrap();
