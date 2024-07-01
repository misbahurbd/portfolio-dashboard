import { getQueryParams } from "@/lib/utils"
import { baseApi } from "@/redux/api/base-api"

const projectApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createProject: builder.mutation({
      query: projectData => ({
        url: "/projects",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["projects"],
    }),

    getProjects: builder.query({
      query: ({ query }) => {
        const params = query ? getQueryParams(query) : {}

        return {
          url: "/projects",
          method: "GET",
          params: params,
        }
      },
      providesTags: ["projects"],
    }),

    getProject: builder.query({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...projectData }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: projectData,
      }),
      invalidatesTags: ["projects"],
    }),

    deleteProject: builder.mutation({
      query: id => {
        return {
          url: `/projects/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["projects"],
    }),
  }),
})

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProductMutation,
  useDeleteProjectMutation,
} = projectApi
