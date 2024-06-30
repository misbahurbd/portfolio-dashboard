import { baseApi } from "@/redux/api/base-api"

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "/auth/refresh-token",
        method: "GET",
        credentials: true,
      }),
    }),
  }),
})

export const { useLoginMutation, useLazyRefreshTokenQuery } = authApi
