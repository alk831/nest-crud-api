import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req
  ) {
    return req.user;
  }

  @Post('register')
  async register(
    @Body() credentials
  ) {
    const newUser = await this.authService.createUser(
      credentials.email,
      credentials.password
    );

    if (!newUser) {
      throw new BadRequestException('This email is in use.');
    }

    return newUser;
  }

}
