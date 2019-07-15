import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { PinterestService } from '../pinterest/pinterest.service';


@Module({
  controllers: [CardsController],
  providers: [CardsService, PinterestService]
})
export class CardsModule {};