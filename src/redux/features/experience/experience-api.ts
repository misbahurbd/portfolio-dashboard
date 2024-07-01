import { getQueryParams } from "@/lib/utils"
import { baseApi } from "@/redux/api/base-api"

const experienceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createExperience: builder.mutation({
      query: experienceData => ({
        url: "/experiences",
        method: "POST",
        body: experienceData,
      }),
      invalidatesTags: ["experiences"],
    }),

    getExperiences: builder.query({
      query: ({ query }) => {
        const params = query ? getQueryParams(query) : {}

        return {
          url: "/experiences",
          method: "GET",
          params: params,
        }
      },
      providesTags: ["experiences"],
    }),

    getExperience: builder.query({
      query: id => ({
        url: `/experiences/${id}`,
        method: "GET",
      }),
      providesTags: ["experiences"],
    }),

    updateExperience: builder.mutation({
      query: ({ id, ...experienceData }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        body: experienceData,
      }),
      invalidatesTags: ["experiences"],
    }),

    deleteExperience: builder.mutation({
      query: id => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experiences"],
    }),
  }),
})

export const {
  useCreateExperienceMutation,
  useGetExperiencesQuery,
  useGetExperienceQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi
