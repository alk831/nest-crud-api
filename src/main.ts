import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSequelize } from './config/sequelize';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const sequelize = await configureSequelize();
  // await sequelize.sync({ force: true });
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080'
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false 
  }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
