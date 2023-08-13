import { baseApi } from '../base-api.ts'

import { RequestForgotPassword, ResponseUserType, SignUpArgsType } from './types.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<ResponseUserType | null, void>({
        query: () => ({
          url: 'v1/auth/me',
          method: 'GET',
        }),
        extraOptions: { maxRetries: 0 },
        providesTags: ['Me'],
      }),
      login: builder.mutation<void, { email: string; password: string; rememberMe: boolean }>({
        query: body => ({
          url: 'v1/auth/login',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      logout: builder.mutation<void, void>({
        query: body => ({
          url: 'v1/auth/logout',
          method: 'POST',
          body: body,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('me', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Me'],
      }),
      signUp: builder.mutation<ResponseUserType, SignUpArgsType>({
        query: body => ({
          url: 'v1/auth/sign-up',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      forgotPassword: builder.mutation<RequestForgotPassword, { email: string; html: string }>({
        query: ({ email, html }) => ({
          url: 'v1/auth/recover-password',
          method: 'POST',
          body: {
            email,
            html,
          },
        }),
        invalidatesTags: ['Me'],
      }),
      resetPassword: builder.mutation<
        RequestForgotPassword,
        { token: string | undefined; password: string }
      >({
        query: ({ token, password }) => ({
          url: `v1/auth/reset-password/${token}`,
          method: 'POST',
          body: { password },
        }),
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi

/*
async onQueryStarted(_, { dispatch, queryFulfilled }) {
  const patchResult = dispatch(
      authApi.util.updateQueryData('me', undefined, () => {
        return null
      })
  )

  try {
    await queryFulfilled
  } catch {
    patchResult.undo()

    /!**
     * Alternatively, on failure you can invalidate the corresponding cache tags
     * to trigger a re-fetch:
     * dispatch(api.util.invalidateTags(['Post']))
     *!/
  }
},*/
