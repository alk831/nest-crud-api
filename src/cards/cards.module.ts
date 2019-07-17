import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { PinterestModule } from '../pinterest/pinterest.module';

@Module({
  imports: [PinterestModule],
  controllers: [CardsController],
  providers: [CardsService]
})
export class CardsModule {};