import {
  Controller,
  Post,
  UseGuards,
  Body,
  BadRequestException,
  HttpCode
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBody } from './dto';
import { LoginGuard } from './guards/login.guard';
import { UserData } from '../common/decorators';
import { User } from '../models';
import { USER_GROUP } from '../common/consts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginGuard)
  @HttpCode(200)
  @Post('login')
  async login(
    @UserData() user: User
  ) {
    const { password, ...data } = user;
    return {
      data: {
        user: data,
        groups: USER_GROUP
      }
    }
  }

  @Post('register')
  async register(
    @Body() { email, password }: RegisterBody
  ) {
    const newUser = await this.authService.createUser(email, password);

    if (!newUser) {
      throw new BadRequestException('This email is in use.');
    }

    return newUser;
  }

}
