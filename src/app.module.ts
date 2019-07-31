import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CardsModule,
    AuthModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
