import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { LocalSerializer } from './local.serializer';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      session: true
    })
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer],
  controllers: [AuthController]
})
export class AuthModule {}