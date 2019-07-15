import { Injectable } from '@nestjs/common';
import { PinterestPin } from 'src/pinterest/interfaces/pinterest.interface';

@Injectable()
export class CardsService {
  private readonly favoriteCards: PinterestPin[] = [];

  async addFavorite(card: PinterestPin) {
    this.favoriteCards.push(card);
    return card;
  }

  async removeFavorite(cardId: PinterestPin['id']) {
    this.favoriteCards.filter(card => card.id !== cardId);
    return;
  }

  async getPopular() {
    return this.favoriteCards;
  }

}