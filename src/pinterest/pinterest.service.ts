import { Injectable } from '@nestjs/common';
import { PinterestPin, PinterestBoardPinsPayload } from './interfaces/pinterest.interface';
import fetch from 'node-fetch';

@Injectable()
export class PinterestService {

  private readonly pinFields = ['id', 'note', 'image', 'url', 'creator', 'created_at', 'color', 'media'].join(',');

  async getPinsForBoard(
    userName: string,
    boardName: string,
    cursor?: string
  ): Promise<PinterestBoardPinsPayload> {
    const cursorParam = cursor ? `&cursor=${cursor}` : '';

    const response = await fetch(
      `https://api.pinterest.com/v1/boards/${userName}/${boardName}/pins/?fields=${this.pinFields}${cursorParam}`, {
      headers: { Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}` }
    });
    const data: PinterestBoardPinsPayload = await response.json();

    return data;
  }

  async getPinInfo(pinId: PinterestPin['id']): Promise<PinterestPin> {
    const response = await fetch(`https://api.pinterest.com/v1/pins/${pinId}/?fields=${this.pinFields}`, {
      headers: { Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}` }
    });
    const data: { data: PinterestPin } = await response.json();

    return data.data;
  }

}