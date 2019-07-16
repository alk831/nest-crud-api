import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { User } from '../../models';
import { UserGroup } from 'src/auth/interfaces';

export const UserData = createParamDecorator((data, req): User => {
  return req.user as User;
});

export const Groups = (group: UserGroup) => SetMetadata('roles', group);