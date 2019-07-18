import { Injectable } from '@nestjs/common';
import { CardsService } from '../cards/cards.service';
import { CardCategory } from '../common/types';
import { promises as fs } from 'fs';

@Injectable()
export class FetcherService {
  constructor(private readonly cardsService: CardsService) {}

  private saveFetchedCards(data) {
    return fs.writeFile(__dirname + './', JSON.stringify(data));
  }

  async fetchAndSave(category: CardCategory) {
    const pagesLimit = 10;
    const fetchedData = [];
    let lastCursor: string;

    try {
      for (let i = 0; i < pagesLimit; i++) {
        const { data, page } = await this.cardsService.getPinsforMuzliBoard(
          category,
          lastCursor  
        );
        lastCursor = page.cursor;
        fetchedData.push(...data);
      }
    } catch(err) {
      console.error(err);
    } finally {
      await this.saveFetchedCards(fetchedData);
    }
  }
}
