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
      createCard: builder.mutation<any, any>({
        query: ({ id, formData }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['Cards', 'Decks'],
      }),
      editCard: builder.mutation<any, { id: string; formData: FormData }>({
        query: ({ id, formData }) => ({
          url: `v1/cards/${id}`,
          method: 'PATCH',
          body: formData,
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

/*type CreateEditArguments = {
  id: string
  questionImg?: string
  answerImg?: string
  question?: string
  answer?: string
  questionVideo?: string
  answerVideo?: string
}*/
