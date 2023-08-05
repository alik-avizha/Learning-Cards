import { PaginatedEntity, PaginatedRequest } from '../types.ts'

export type GetDecksArgs = PaginatedRequest<{
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: Author['id']
  orderBy?: string
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
