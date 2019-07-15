import { Injectable } from '@nestjs/common';
import { PinterestBoardPins, PinterestPin, PinterestBoardPinsPayload } from './interfaces/pinterest.interface';

const pinFields = ['id', 'note', 'image', 'url', 'created_at', 'color', 'media'].join(',');

@Injectable()
export class PinterestService {

  async getPinsForBoard(
    userName: string,
    boardName: string
  ): Promise<PinterestBoardPins> {
    const response = await fetch(`https://api.pinterest.com/v1/boards/${userName}/${boardName}/pins/?fields=${pinFields}`, {
      headers: { Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}` }
    });
    const data: PinterestBoardPinsPayload = await response.json();

    return data.data;
  }

  async getPinInfo(pinId: PinterestPin['id']): Promise<PinterestPin> {
    const response = await fetch(`https://api.pinterest.com/v1/pins/${pinId}/?fields=${pinFields}`, {
      headers: { Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}` }
    });
    const data: { data: PinterestPin } = await response.json();

    return data.data;
  }

}