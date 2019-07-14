import { Injectable } from '@nestjs/common';


type PinterestBoardPins = {
  id: string
  url: string
  note: string
  link: string
}[]

interface PinterestBoardPinsPayload {
  data: PinterestBoardPins
}

interface PinterestPin {
  id: string
  note: string
  created_at: string
  link: string
  color: string
  image: {
    original: {
      url: string
      width: number
      height: number
    }
  }
}

@Injectable()
export class PinterestService {

  async getPinsForBoard(
    userName: string,
    boardName: string
  ): Promise<PinterestBoardPins> {
    const response = await fetch(`https://api.pinterest.com/v1/boards/${userName}/${boardName}/pins/`, {
      headers: { Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}` }
    });
    const data: PinterestBoardPinsPayload = await response.json();

    return data.data;
  }

  async getPinInfo(pinId: PinterestPin['id']): Promise<PinterestPin> {
    const fields = ['id', 'note', 'image', 'url','creator', 'created_at', 'color', 'media'].join(',');

    const response = await fetch(`https://api.pinterest.com/v1/pins/${pinId}/?fields=${fields}`, {
      headers: { Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}` }
    });
    const data = await response.json();

    return data.data;
  }

}