import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/services/base-api-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Me'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
