import 'class-validator';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { CorsConfig, NestConfig } from './app/common/config/config.interface';
import { __ORIGIN__ } from './app/utils/constants';
import { AppModule } from './app/app.module';

const bootstrap = async () => {
  /*==================Initialization================*/
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*================== VALIDATION ==================*/
  app.useGlobalPipes(new ValidationPipe());

  /*================== CONFIG SETUP ================*/
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');

  /*========= PREFIX =========*/
  app.setGlobalPrefix('api');

  /*========= VERSIONING =========*/
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /*========= CORS =========*/
  if (corsConfig?.enabled) {
    app.enableCors({
      origin: __ORIGIN__,
      credentials: true,
    });
  }

  /*========= PRISMA =========*/
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  /*========= MIDDLEAWARES =========*/
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /*========= START =========*/
  await app.listen(process.env.PORT || nestConfig?.port || 4000);
};

bootstrap();
