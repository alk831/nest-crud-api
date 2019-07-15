import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSequelize } from './config/sequelize';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  const sequelize = await configureSequelize();
  // await sequelize.sync({ force: true });
  const app = await NestFactory.create(AppModule);

  app.use(session({
    secret: process.env.SESSION_SECRET
  }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
