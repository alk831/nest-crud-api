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
import { PinterestPin } from '../pinterest/interfaces/pinterest.interface';
import { UserData } from '../common/decorators';
import { User } from '../models';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { GetPopularCardsParams, SaveCardAsFavoriteBody } from './dto';
import mockedPins from '../mock.json';
import { CardFrame } from './interfaces';

@Controller('cards')
@UseGuards(AuthenticatedGuard)
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly pinterestService: PinterestService
  ) {}

  @Get('popular')
  async getPopularCards(
    @Query() { cursor, category = 'mobile interaction' }: GetPopularCardsParams
  ) {
    
    const data = mockedPins.data
      .filter((_, index) => index <= 10)
      .map(pin => 
        this.cardsService.transformPinToCard(pin, category)
      );
      
    return {
      page: mockedPins.page,
      data
    }
  }

  @Get('favorite')
  async getFavoriteCards(
    @UserData() user: User
  ) {
    const data = await this.cardsService.getFavorites(user.id);
    return { data };
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