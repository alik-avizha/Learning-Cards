import { PaginatedEntity, PaginatedRequest } from '../types.ts'

export type GetDecksArgs = PaginatedRequest<{
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: Author['id']
  orderBy: string | null
}>

export type DecksResponse = PaginatedEntity<Deck> & {
  maxCardsCount: number
}

export type CreateGetDeckArgs = {
  name: string
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean
  isBlocked?: boolean
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type DeckResponse = {
  author: DeckResponseAuthor
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}
export type DeckResponseAuthor = {
  id: string
  name: string
}
