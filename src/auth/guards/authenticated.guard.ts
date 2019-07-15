import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    return request.user;
  }
}