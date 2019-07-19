import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FetcherService } from './fetcher/fetcher.service';
import { FetcherModule } from './fetcher/fetcher.module';

@Module({
  imports: [
    CardsModule,
    AuthModule,
    UserModule,
    FetcherModule
  ],
  providers: [FetcherService],
})
export class AppModule {}
