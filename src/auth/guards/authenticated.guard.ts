import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserGroup } from '../interfaces';
import { USER_GROUP } from 'src/common/consts';
import { User } from '../../models';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedGroup = this.reflector.get<UserGroup>('roles', context.getHandler());
    const request: { user?: User } = await context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    if (allowedGroup) {
      const userGroupIndex = USER_GROUP.findIndex(group => group === request.user.group);
      const allowedGroupIndex = USER_GROUP.findIndex(group => group === allowedGroup);
      return userGroupIndex >= allowedGroupIndex;
    }
    
    return true;
  }
}