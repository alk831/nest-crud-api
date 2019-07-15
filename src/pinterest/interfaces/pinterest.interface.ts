
export interface PinterestPin {
  id: string
  note: string
  created_at: string
  link: string
  color: string | null
  url: string
  creator?: {
    id: string
    first_name: string
    last_name: string
    url: string
  }
  image: {
    original: {
      url: string
      width: number
      height: number
    }
  }
}

export type PinterestBoardPins = PinterestPin[];

export interface PinterestBoardPinsPayload {
  data: PinterestBoardPins
  page: {
    cursor: string
    next: string
  }
}