import {
  IsString,
  IsUrl,
  IsHexColor,
  IsNumber,
  IsIn,
  IsOptional
} from 'class-validator';
import { CardCategory } from '../../common/types';
import { CARD_CATEGORY } from '../../common/consts';

export class SaveCardAsFavoriteBody {
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

export class GetPopularCardsParams {
  @IsOptional()
  @IsString()
  cursor?: string

  @IsOptional()
  @IsIn([...CARD_CATEGORY])
  category?: CardCategory
}