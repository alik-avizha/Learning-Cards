import { Deck, DeckResponse, DecksResponse, GetDecksArgs, LearnDeckResponse } from './types.ts'

import { baseApi } from '@/services/base-api.ts'

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
      createDeck: builder.mutation<Deck, any>({
        query: formData => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: formData,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<any, any>({
        query: ({ id, formData }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body: formData,
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
      learnDeck: builder.query<
        LearnDeckResponse,
        { id: string | undefined; previousCardId?: string }
      >({
        query: ({ id, previousCardId }) => {
          return {
            url: `v1/decks/${id}/learn`,
            method: 'GET',
            params: { previousCardId },
          }
        },
        providesTags: ['Cards'],
      }),
      updateGradeCard: builder.mutation<
        LearnDeckResponse,
        { id: string | undefined; cardId: string | undefined; grade: number }
      >({
        query: ({ id, cardId, grade }) => ({
          url: `v1/decks/${id}/learn`,
          method: 'POST',
          body: { cardId, grade },
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useGetDeckQuery,
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useUpdateDeckMutation,
  useLearnDeckQuery,
  useUpdateGradeCardMutation,
} = decksApi
