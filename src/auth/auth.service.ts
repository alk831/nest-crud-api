import { Injectable } from '@nestjs/common';
import { User } from '../models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  async validateUser(
    email: User['email'],
    password: User['password']
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email }});

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toJSON();
      return result;
    }

    return null;
  }

  async createUser(email: string, password: string): Promise<User | null> {
    const existingUser = await User.findOne({ where: { email }});

    if (existingUser) {
      return null;
    }

    const newUser = await User.create({ email, password });
    const { password: pwd, ...result } = newUser.toJSON();

    return result;
  }

}
