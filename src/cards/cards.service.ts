import { Injectable } from '@nestjs/common';
import { PinterestPin } from 'src/pinterest/interfaces/pinterest.interface';
import { FavoriteCard, Card } from '../models';

@Injectable()
export class CardsService {
  private readonly favoriteCards: PinterestPin[] = [];

  async addFavorite(card: PinterestPin, userId: number): Promise<Card> {
    const cardId = card.id;
    const likedCard = await FavoriteCard
      .findOne({
        where: { cardId, userId },
        include: [{ model: Card }]
      });

    if (likedCard) {
      return likedCard.card;
    }

    let exisitingCard = await Card.findByPk(cardId);

    if (!exisitingCard) {
      exisitingCard = await Card.create({
        ...card,
        creatorId: card.creator.id,
        creatorName: card.creator.first_name,
        creatorUrl: card.creator.url,
        imageUrl: card.image.original.url,
        imageWidth: card.image.original.width,
        imageHeight: card.image.original.height,
      });
    }

    await FavoriteCard.create({ cardId, userId });

    return exisitingCard;
  }

  async removeFavorite(cardId: PinterestPin['id']) {
    this.favoriteCards.filter(card => card.id !== cardId);
    return;
  }

  async getPopular() {
    return this.favoriteCards;
  }

}