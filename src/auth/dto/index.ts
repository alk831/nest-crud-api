import {
  IsEmail,
  Length, 
  IsAlphanumeric
} from 'class-validator';

export class RegisterBody {
  @IsEmail({}, { message: 'Email is invalid' })
  email: string

  @IsAlphanumeric()
  @Length(4, 20, { message: 'Password length must be between 4 and 20 characters' })
  password: string
}