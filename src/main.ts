import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSequelize } from './config/sequelize';

async function bootstrap() {
  const sequelize = await configureSequelize();
  // await sequelize.sync({ force: true });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
