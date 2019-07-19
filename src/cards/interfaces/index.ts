import { CardCategory } from '../../common/types';

export type MuzliBoardNames = { [key in CardCategory]: string };

export interface CardFrame {
  id: number
  note: string
  category: CardCategory
  url: string
  color: string | null
  imageUrl: string
  imageWidth: number
  imageHeight: number
  creatorId: number
  creatorName: string
  creatorUrl: string
}