import { createParamDecorator } from '@nestjs/common';
import { User } from '../../models';

export const UserData = createParamDecorator((data, req): User => {
  return req.user as User;
});