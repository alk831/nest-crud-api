import { Injectable } from '@nestjs/common';
import { PinterestPin } from '../pinterest/interfaces/pinterest.interface';
import { FavoriteCard, Card, User } from '../models';
import { CardCategory } from '../common/types';
import { PinterestService } from '../pinterest/pinterest.service';
import { MuzliBoardNames, CardFrame } from './interfaces';
import { SaveCardAsFavoriteBody } from './dto';

@Injectable()
export class CardsService {
  constructor(private readonly pinterestService: PinterestService) {}

  private readonly muzliBoardNames: MuzliBoardNames = {
    'mobile interaction': 'mobile-interactions-design-inspiration',
    'dashboard': '350%2B-dashboard-ui-inspiration-2019',
    'mobile app': 'mobile-app-designs',
    'logo': 'logos'
  }

  async getFavorites(userId: User['id']): Promise<Card[]> {
    const favoriteCards = await FavoriteCard.findAll({
      attributes: [],
      where: { userId },
      include: [{ model: Card }]
    });
    const cards = favoriteCards.map(({ card }) => card);
    return cards;
  }

  async getFavorite(
    cardId: Card['id'],
    userId: User['id']
  ): Promise<Card | null> {
    const foundCard = await FavoriteCard.findOne({
      where: { cardId, userId },
      include: [{ model: Card }]
    });

    if (foundCard) {
      return foundCard.card;
    }

    return null;
  }

  async addFavorite(
    card: SaveCardAsFavoriteBody,
    userId: User['id']
  ): Promise<Card> {
    const cardId = card.id;
    const foundFavorite = await this.getFavorite(cardId, userId);

    if (foundFavorite) {
      return foundFavorite;
    }

    let exisitingCard = await Card.findByPk(cardId);

    if (!exisitingCard) {
      exisitingCard = await Card.create(card);
    }

    await FavoriteCard.create({ cardId: exisitingCard.id, userId });

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
      id: pinData.id,
      category,
      imageUrl: image.original.url,
      imageWidth: image.original.width,
      imageHeight: image.original.height,
      creatorId: (creator.id),
      creatorName: creator.first_name,
      creatorUrl: creator.url
    }
  }
}