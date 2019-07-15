import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './config/sequelize';

async function bootstrap() {
  // sequelize.sync({ force: true });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
