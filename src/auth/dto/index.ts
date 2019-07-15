import { IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email is invalid' })
  email: string

  @Length(4, 20, { message: 'Password length must be between 4 and 20 characters' })
  password: string
}