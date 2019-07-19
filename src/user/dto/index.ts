import {
  IsString,
  IsUrl,
  IsHexColor,
  IsNumber,
  IsIn,
  IsOptional
} from 'class-validator';

export class UserUpdateBody {
  @IsNumber()
  points: number
}