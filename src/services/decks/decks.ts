import { baseApi } from '../base-api.ts'

import { CreateGetDeckArgs, Deck, DeckResponse, DecksResponse, GetDecksArgs } from './types.ts'

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
      getDeck: builder.query<DeckResponse, { id: string | undefined }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'GET',
        }),
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
      updateDeck: builder.mutation<any, { id: string; name: string }>({
        query: ({ id, name }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body: { name },
        }),
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
  useGetDeckQuery,
  useLazyGetDecksQuery,
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useUpdateDeckMutation,
} = decksApi
