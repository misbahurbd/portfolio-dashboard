import { baseApi } from "@/redux/api/base-api"

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
})

export const { useGetMeQuery } = userApi
