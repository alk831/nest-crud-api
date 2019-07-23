import { CardCategory } from '../../common/types';

export type MuzliBoardNames = { [key in CardCategory]: string };

export interface CardFrame {
  id: number | string
  note: string
  category: CardCategory
  url: string
  color: string | null
  imageUrl: string
  imageWidth: number
  imageHeight: number
  creatorId: number | string
  creatorName: string
  creatorUrl: string
}