import {
  Controller,
  Post,
  UseGuards,
  Body,
  BadRequestException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginGuard } from './guards/login.guard';
import { UserData } from 'src/common/decorators';
import { User } from 'src/models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async login(
    @UserData() user: User
  ) {
    const { password, ...result } = user;
    return result;
  }

  @Post('register')
  async register(
    @Body() { email, password }: RegisterDto
  ) {
    const newUser = await this.authService.createUser(email, password);

    if (!newUser) {
      throw new BadRequestException('This email is in use.');
    }

    return newUser;
  }

}
