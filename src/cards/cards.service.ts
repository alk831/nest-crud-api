import { Injectable } from '@nestjs/common';
import { PinterestPin } from '../pinterest/interfaces/pinterest.interface';
import { FavoriteCard, Card, User } from '../models';
import { CardCategory } from '../common/types';
import { PinterestService } from '../pinterest/pinterest.service';
import { MuzliBoardNames, CardFrame } from './interfaces';
import { SaveCardAsFavoriteBody } from './dto';
import { Op } from 'sequelize';

@Injectable()
export class CardsService {
  constructor(private readonly pinterestService: PinterestService) {}

  private readonly muzliBoardNames: MuzliBoardNames = {
    'mobile interaction': 'mobile-interactions-design-inspiration',
    'dashboard': '350%2B-dashboard-ui-inspiration-2019',
    'mobile app': 'mobile-app-designs',
    'logo': 'logos'
  }
  private readonly cardsPageLimit = 6;
  
  private getOffset(page: number) {
    return Math.floor((page - 1) * this.cardsPageLimit);
  }

  private getPaginationParams(page: number) {
    return {
      limit: this.cardsPageLimit,
      offset: this.getOffset(page)
    }
  }

  async getPopular(userId: User['id'], page: number): Promise<Card[]> {
    const favoriteCards = await this.getFavorites(userId);
    const favoriteCardIds = favoriteCards.map(card => card.id);
    let where;

    if (favoriteCardIds.length) {
      where = {
        id: { [Op.notIn]: favoriteCardIds }
      }
    }

    const popularCards = await Card.findAll({
      where,
      ...this.getPaginationParams(page)
    });

    const parsedCards = popularCards.map(card => ({
      ...card.toJSON(),
      id: card.id.toString()
    }));

    return parsedCards;
  }

  async getFavorites(userId: User['id'], page?: number): Promise<Card[]> {
    const favoriteCards = await FavoriteCard.findAll({
      attributes: [],
      where: { userId },
      include: [{ model: Card }],
      ...page && this.getPaginationParams(page)
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
      creatorId: creator.id,
      creatorName: creator.first_name,
      creatorUrl: creator.url
    }
  }

  async savePins(pins: PinterestPin[], category: CardCategory) {
    const cardData = pins.map(pin => this.transformPinToCard(pin, category));
    await Promise.all(
      cardData.map(card => Card.create(card))
    );
  }
}