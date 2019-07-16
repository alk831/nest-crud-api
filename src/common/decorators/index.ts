import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { User } from '../../models';
import { UserGroup } from '../../auth/interfaces';

export const UserData = createParamDecorator((data, req): User => {
  return req.user as User;
});

export const Groups = (...groups: UserGroup[]) => SetMetadata('roles', groups);