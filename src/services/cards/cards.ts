import { baseApi } from '@/services/base-api.ts'
import { CardsResponse, GetRequestType, RootObjectItems } from '@/services/cards/types.ts'

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
      createCard: builder.mutation<RootObjectItems, { id: string | undefined; formData: FormData }>(
        {
          query: ({ id, formData }) => ({
            url: `v1/decks/${id}/cards`,
            method: 'POST',
            body: formData,
          }),
          invalidatesTags: ['Cards', 'Decks'],
        }
      ),
      editCard: builder.mutation<RootObjectItems, { id: string; formData: FormData }>({
        query: ({ id, formData }) => ({
          url: `v1/cards/${id}`,
          method: 'PATCH',
          body: formData,
        }),
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<void, { id: string }>({
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
