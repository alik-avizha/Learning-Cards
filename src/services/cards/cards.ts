import { baseApi } from '@/services/base-api.ts'
import { CardsResponse, GetRequestType } from '@/services/cards/types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, GetRequestType>({
        query: ({ id, question, ...args }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'GET',
          params: { question, ...args },
        }),
        providesTags: ['Cards'],
      }),
      createCard: builder.mutation<
        any,
        { id: string | undefined; question: string; answer: string }
      >({
        query: ({ id, ...args }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'POST',
          body: { ...args },
        }),
        invalidatesTags: ['Cards'],
      }),
      editCard: builder.mutation<any, CreateEditArguments>({
        query: ({ id, ...args }) => ({
          url: `v1/cards/${id}`,
          method: 'PATCH',
          body: { ...args },
        }),
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<any, { id: string }>({
        query: ({ id }) => ({
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
} = cardsApi

type CreateEditArguments = {
  id: string
  questionImg?: string
  answerImg?: string
  question?: string
  answer?: string
  questionVideo?: string
  answerVideo?: string
}
