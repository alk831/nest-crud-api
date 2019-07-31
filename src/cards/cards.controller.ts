import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { PinterestService } from '../pinterest/pinterest.service';
import { UserData } from '../common/decorators';
import { User } from '../models';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { GetPopularCardsParams, SaveCardAsFavoriteBody, GetFavoriteCardsParams } from './dto';

@Controller('cards')
@UseGuards(AuthenticatedGuard)
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly pinterestService: PinterestService
  ) {}

  @Get('popular')
  async getPopularCards(
    @UserData() user: User,
    @Query() { category = 'mobile interaction', page = '1' }: GetPopularCardsParams
  ) {
    const parsedPage = Number(page);
    const popular = await this.cardsService.getPopular(user.id, parsedPage);
    const cursor = `${process.env.HOST}/cards/favorite?page=${parsedPage + 1}`;
    return {
      data: popular,
      count: popular.length,
      page: parsedPage,
      cursor
    }
  }

  @Get('favorite')
  async getFavoriteCards(
    @UserData() user: User,
    @Query() { page = '1' }: GetFavoriteCardsParams
  ) {
    const parsedPage = Number(page);
    const data = await this.cardsService.getFavorites(user.id, parsedPage);
    const cursor = `${process.env.HOST}/cards/favorite?page=${parsedPage + 1}`;
    return {
      data,
      count: data.length,
      page: parsedPage,
      cursor
    }
  }

  @Post('favorite')
  async saveCardAsFavorite(
    @Body() body: SaveCardAsFavoriteBody,
    @UserData() user: User
  ) {
    const likedCard = await this.cardsService.addFavorite(body, user.id);
    return likedCard;
  }

  @Delete('favorite/:id')
  async removeCardFromFavorite(
    @Param('id') id: string,
    @UserData() user: User
  ) {
    const hasBeenRemoved = await this.cardsService.removeFavorite(id, user.id);
    if (!hasBeenRemoved) {
      throw new NotFoundException(
        `Card with id of ${id} is not saved as your favorite, or does not exists.`
      );
    }
  }

}