import { baseApi } from '../base-api.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDeck: builder.query<DeckResponse, { id: string }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'GET',
        }),
        providesTags: ['Decks'],
      }),
      getCards: builder.query<CardsResponse, GetRequestType>({
        query: ({ id, question, ...args }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'GET',
          params: { question, ...args },
        }),
      }),
    }
  },
})

export type GetRequestType = {
  id?: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export const { useGetCardsQuery, useGetDeckQuery } = cardsApi

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

export type CardsResponse = {
  items: RootObjectItems[]
  pagination: RootObjectPagination
}
export type RootObjectItems = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}
export type RootObjectPagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}
