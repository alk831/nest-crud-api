import { Controller, Get, Post, Delete, HttpCode, Param } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('/cards/popular')
  getPopularCards() {
    return this.cardsService.getPopular();
  }

  @Post('/favorite/:id')
  saveCardAsFavorite(
    @Param('id') id
  ) {
    // return this.cardsService.addFavorite(id)
  }

  @Delete('/cards/favorite/:id')
  removeCardFromFavorite() {
    
  }

}