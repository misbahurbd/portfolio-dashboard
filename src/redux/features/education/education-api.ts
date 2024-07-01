import { getQueryParams } from "@/lib/utils"
import { baseApi } from "@/redux/api/base-api"

const educationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createEducation: builder.mutation({
      query: educationData => ({
        url: "/educations",
        method: "POST",
        body: educationData,
      }),
      invalidatesTags: ["educations"],
    }),

    getEducations: builder.query({
      query: ({ query }) => {
        const params = query ? getQueryParams(query) : {}

        return {
          url: "/educations",
          method: "GET",
          params: params,
        }
      },
      providesTags: ["educations"],
    }),

    getEducation: builder.query({
      query: id => ({
        url: `/educations/${id}`,
        method: "GET",
      }),
      providesTags: ["educations"],
    }),

    updateEducation: builder.mutation({
      query: ({ id, ...educationData }) => ({
        url: `/educations/${id}`,
        method: "PUT",
        body: educationData,
      }),
      invalidatesTags: ["educations"],
    }),

    deleteEducation: builder.mutation({
      query: id => ({
        url: `/educations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["educations"],
    }),
  }),
})

export const {
  useCreateEducationMutation,
  useGetEducationsQuery,
  useGetEducationQuery,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi
