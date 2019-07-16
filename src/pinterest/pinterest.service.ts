import { Injectable } from '@nestjs/common';
import { PinterestPin, PinterestBoardPinsPayload } from './interfaces/pinterest.interface';
import fetch from 'node-fetch';

@Injectable()
export class PinterestService {

  private readonly host = 'https://api.pinterest.com/v1';
  private readonly authHeader = { Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}` }
  private readonly pinFields = [
    'id', 'note', 'image', 'url', 'link', 'creator', 'created_at', 'color', 'media'
  ].join(',');

  /**
   * Returns array of pins from user's board.
   * @param userName Name of the user that we want to fetch from.
   * @param boardName Name of the board that user owns.
   * @param cursor URL that points to next page (pagination).
   */
  async getPinsForBoard(
    userName: string,
    boardName: string,
    cursor?: string
  ): Promise<PinterestBoardPinsPayload> {
    const cursorParam = cursor ? `&cursor=${cursor}` : '';

    const response = await fetch(
      `${this.host}/boards/${userName}/${boardName}/pins/?fields=${this.pinFields}${cursorParam}`, {
      headers: this.authHeader
    });
    const data: PinterestBoardPinsPayload = await response.json();

    return data;
  }

  /**
   * Returns data about specific pin.
   * @param pinId
   * @returns `PinterestPin`
   */
  async getPinInfo(
    pinId: PinterestPin['id']
  ): Promise<PinterestPin> {
    const response = await fetch(`${this.host}/pins/${pinId}/?fields=${this.pinFields}`, {
      headers: this.authHeader
    });
    const data: { data: PinterestPin } = await response.json();

    return data.data;
  }

}