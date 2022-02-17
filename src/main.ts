import 'class-validator';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as session from 'express-session';
import { CorsConfig, NestConfig } from './common/config/config.interface';
import { __ORIGIN__ } from './utils/constants';
import { AppModule } from './app.module';

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

  app.set('trust proxy', 1);

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
  //app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 365 * 1000,
      },
    }),
  );

  /*========= MIDDLEAWARES =========*/
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /*========= PASSPORT =========*/
  app.use(passport.initialize());
  app.use(passport.session());

  /*========= START =========*/
  await app.listen(process.env.PORT || nestConfig?.port || 4000);
};

bootstrap();
