import { baseApi } from "@/redux/api/base-api"

const uploadApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    upload: builder.mutation({
      query: file => ({
        url: "/upload",
        method: "POST",
        body: file,
      }),
    }),
  }),
})

export const { useUploadMutation } = uploadApi
