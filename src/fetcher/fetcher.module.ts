import { Module } from '@nestjs/common';
import { FetcherService } from './fetcher.service';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [CardsModule],
  providers: [FetcherService],
  exports: [FetcherService]
})
export class FetcherModule {}
