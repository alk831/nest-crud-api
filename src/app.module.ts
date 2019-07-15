import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, { useNewUrlParser: true }),
    CardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
