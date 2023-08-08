import { baseApi } from '../base-api.ts'

import { CreateGetDeckArgs, Deck, DecksResponse, GetDecksArgs } from './types.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: 'v1/decks',
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateGetDeckArgs>({
        query: ({ name }) => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deletedDeck: builder.mutation<any, any>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useLazyGetDecksQuery,
  useCreateDeckMutation,
  useDeletedDeckMutation,
} = decksApi
