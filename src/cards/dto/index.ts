import {
  IsString,
  IsUrl,
  IsHexColor,
  IsNumber,
  IsIn,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { CardCategory } from '../../common/types';
import { CARD_CATEGORY } from '../../common/consts';

export class SaveCardAsFavoriteBody {
  @IsNumberString()
  id: string

  @IsString()
  category: CardCategory

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

  @IsNumberString()
  creatorId: string

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

  @IsOptional()
  @IsNumberString()
  page?: string
}

export class GetFavoriteCardsParams {
  @IsOptional()
  @IsNumberString()
  page?: string
}