import {
  IsString,
  IsUrl,
  IsHexColor,
  IsNumber
} from 'class-validator';

export class CardDto {
  @IsString()
  note: string

  @IsUrl()
  url: string

  @IsHexColor()
  color: string | null

  @IsUrl()
  imageUrl: string

  @IsNumber()
  imageWidth: number

  @IsNumber()
  imageHeight: number

  @IsNumber()
  creatorId: number

  @IsString()
  creatorName: string

  @IsUrl()
  creatorUrl: string
}