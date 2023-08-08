import { baseApi } from '../base-api.ts'

import { CardsResponse, DeckResponse, GetRequestType } from './types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDeck: builder.query<DeckResponse, { id: string | undefined }>({
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

export const { useGetCardsQuery, useGetDeckQuery } = cardsApi
