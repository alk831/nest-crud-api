import { Controller, Get, Post, Delete, HttpCode, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { PinterestService } from '../pinterest/pinterest.service';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly pinterestService: PinterestService
  ) {}

  @Get('popular')
  getPopularCards() {
    return this.pinterestService.getPinsForBoard(
      'usemuzli',
      'mobile-interactions-design-inspiration'
    );
  }

  @Post('favorite/:id')
  saveCardAsFavorite(
    @Param('id') id
  ) {
    // return this.cardsService.addFavorite(id)
  }

  @Delete('favorite/:id')
  removeCardFromFavorite() {
    
  }

}