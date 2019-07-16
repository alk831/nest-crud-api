import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserGroup } from '../interfaces';
import { User } from '../../models';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedGroups = this.reflector.get<UserGroup[]>('roles', context.getHandler());
    const request: { user?: User } = await context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    if (allowedGroups && allowedGroups.length) {
      return allowedGroups.includes(request.user.group);
    }
    
    return true;
  }
}