import { Injectable } from '@nestjs/common';
import { PinterestPin } from 'src/pinterest/interfaces/pinterest.interface';
import { FavoriteCard, Card } from './schemas/card.schema';

@Injectable()
export class CardsService {
  private readonly favoriteCards: PinterestPin[] = [];

  async addFavorite(card: PinterestPin, userId: number) {
    const likedCard = await FavoriteCard.findOne({ cardId: card.id, userId }).exec();

    if (likedCard) {
      return likedCard;
    }

    let exisitingCard = await Card.findById(card.id).exec();

    if (!exisitingCard) {
      exisitingCard = await Card.create(card);
    }

    const newlyLikedCard = await FavoriteCard.create({ cardId: card.id, userId });

    return newlyLikedCard;
  }

  async removeFavorite(cardId: PinterestPin['id']) {
    this.favoriteCards.filter(card => card.id !== cardId);
    return;
  }

  async getPopular() {
    return this.favoriteCards;
  }

}