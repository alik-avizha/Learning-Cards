/*
import { baseApi } from '../base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<ResponseUserType, void>({
        query: () => ({
          url: 'v1/auth/me',
          method: 'GET',
        }),
      }),
    }
  },
})

export const { useMeQuery } = authApi
export type ResponseUserType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
*/
export {}
