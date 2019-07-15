import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../models';

@Injectable()
export class LocalSerializer extends PassportSerializer {

  serializeUser(user: User, done: CallableFunction) {
    console.log('serializeUser', { user });
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    console.log('deserializeUser', { userId });
    const user = await User.findByPk(Number(userId));
    if (user) {
      const { password, ...result } = user.toJSON();
      done(null, result);
    } else {
      done(new Error('User with this id does not exits'));
    }
  }
  
}