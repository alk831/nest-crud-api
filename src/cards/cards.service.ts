import { Injectable } from '@nestjs/common';
import { PinterestPin } from 'src/pinterest/interfaces/pinterest.interface';
import { FavoriteCard, Card, User } from '../models';

@Injectable()
export class CardsService {

  async getFavorite(userId: User['id']): Promise<Card[]> {
    const favoriteCards = await FavoriteCard.findAll({
      attributes: [],
      where: { userId },
      include: [{ model: Card }]
    });
    const cards = favoriteCards.map(({ card }) => card);
    return cards;
  }

  async addFavorite(card: PinterestPin, userId: User['id']): Promise<Card> {
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
      exisitingCard = await Card.create(card);
    }

    await FavoriteCard.create({ cardId, userId });

    return exisitingCard;
  }

  async removeFavorite(cardId: PinterestPin['id'], userId: User['id']): Promise<boolean> {
    const deletedCount = await FavoriteCard.destroy({
      where: { cardId, userId }
    });
    return deletedCount >= 1;
  }

}