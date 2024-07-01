import { getQueryParams } from "@/lib/utils"
import { baseApi } from "@/redux/api/base-api"

const blogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createBlog: builder.mutation({
      query: blogData => ({
        url: "/blogs/",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["blogs"],
    }),

    getBlogs: builder.query({
      query: ({ query }) => {
        const params = query ? getQueryParams(query) : {}

        return {
          url: "/blogs",
          method: "GET",
          params: params,
        }
      },
      providesTags: ["blogs"],
    }),

    getBlog: builder.query({
      query: id => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, ...blogData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: blogData,
      }),
      invalidatesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: id => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
})

export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi
