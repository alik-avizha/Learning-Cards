import { baseApi } from '../base-api.ts'

import { ResponseUserType } from './types.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<ResponseUserType, void>({
        query: () => ({
          url: 'v1/auth/me',
          method: 'GET',
        }),
      }),
      login: builder.mutation<void, { email: string; password: string; rememberMe: boolean }>({
        query: body => ({
          url: 'v1/auth/login',
          method: 'POST',
          body: body,
        }),
      }),
      logout: builder.mutation<void, void>({
        query: body => ({
          url: 'v1/auth/logout',
          method: 'POST',
          body: body,
        }),
      }),
    }
  },
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
