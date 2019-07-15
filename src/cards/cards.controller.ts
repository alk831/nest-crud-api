import { Controller, Get, Post, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { PinterestService } from '../pinterest/pinterest.service';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly pinterestService: PinterestService
  ) {}

  private readonly pinterestUser = 'usemuzli';

  @Get('popular')
  getPopularCards(
    @Query() query: { cursor?: string }
  ) {
    return this.pinterestService.getPinsForBoard(
      'usemuzli',
      'mobile-interactions-design-inspiration',
      query.cursor
    );
  }

  @Post('favorite/:id')
  saveCardAsFavorite(
    @Param('id') id: string
  ) {
    // return this.cardsService.addFavorite(id)
  }

  @Delete('favorite/:id')
  removeCardFromFavorite() {
    
  }

}