import { Injectable } from '@nestjs/common';
import { PinterestPin } from '../pinterest/interfaces/pinterest.interface';
import { FavoriteCard, Card, User } from '../models';
import { CardCategory } from '../common/types';
import { PinterestService } from '../pinterest/pinterest.service';
import { MuzliBoardNames, CardFrame } from './interfaces';

@Injectable()
export class CardsService {
  constructor(private readonly pinterestService: PinterestService) {}

  private readonly muzliBoardNames: MuzliBoardNames = {
    'mobile interaction': 'mobile-interactions-design-inspiration',
    'dashboard': '350%2B-dashboard-ui-inspiration-2019',
    'mobile app': 'mobile-app-designs',
    'logo': 'logos'
  }

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

  getPinsforMuzliBoard(
    category: CardCategory,
    cursor?: string
  ) {
    const boardName = this.muzliBoardNames[category];
    
    return this.pinterestService.getPinsForBoard(
      'usemuzli',
      boardName,
      cursor
    );
  }

  transformPinToCard(
    pin: PinterestPin,
    category: CardCategory
  ): CardFrame {
    const { creator, image, ...pinData } = pin;
    return {
      ...pinData,
      id: Number(pinData.id),
      category,
      imageUrl: image.original.url,
      imageWidth: image.original.width,
      imageHeight: image.original.height,
      creatorId: Number(creator.id),
      creatorName: creator.first_name,
      creatorUrl: creator.url
    }
  }
}