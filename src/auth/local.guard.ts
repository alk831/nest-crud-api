import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActive = await super.canActivate(context);
    if (canActive) {
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }
    return true;
  }
}