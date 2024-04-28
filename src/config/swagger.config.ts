import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .setTitle('Shorten URL API')
  .setDescription(
    'Provides URL shortening services, designed to be fast and reliable.',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swagger = (app: INestApplication) =>
  SwaggerModule.createDocument(app, swaggerOptions);
