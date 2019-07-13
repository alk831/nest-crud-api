import { Injectable } from '@nestjs/common';

@Injectable()
export class CardsService {
  private readonly favoriteCards: Card[] = [];

  async addFavorite(card: Card) {
    this.favoriteCards.push(card);
    return card;
  }

  async removeFavorite(cardId: Card['id']) {
    this.favoriteCards.filter(card => card.id !== cardId);
    return;
  }

  async getPopular() {
    return this.favoriteCards;
  }

}

export interface Card {
  id: number
  title: string
  author: {
    id: number
    name: string
    avatar: string
  }
}