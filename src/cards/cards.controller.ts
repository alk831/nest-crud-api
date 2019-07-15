import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common';
import { CardsService } from './cards.service';
import { PinterestService } from '../pinterest/pinterest.service';
import { PinterestPin } from 'src/pinterest/interfaces/pinterest.interface';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly pinterestService: PinterestService
  ) {}

  private readonly pinterestUser = 'usemuzli';
  // mock
  private readonly userId = 1;

  @Get('popular')
  getPopularCards(
    @Query() query: { cursor?: string }
  ) {
    return this.pinterestService.getPinsForBoard(
      this.pinterestUser,
      'mobile-interactions-design-inspiration',
      query.cursor
    );
  }

  @Post('favorite')
  async saveCardAsFavorite(
    @Body() body: PinterestPin
  ) {
    const likedCard = await this.cardsService.addFavorite(body, this.userId);
    return likedCard;
  }

  @Delete('favorite/:id')
  removeCardFromFavorite() {
    
  }

}