import { getQueryParams } from "@/lib/utils"
import { baseApi } from "@/redux/api/base-api"

const skillApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addSkill: builder.mutation({
      query: skillData => ({
        url: "/skills/",
        method: "POST",
        body: skillData,
      }),
      invalidatesTags: ["skills"],
    }),

    getSkills: builder.query({
      query: ({ query }) => {
        const params = query ? getQueryParams(query) : {}

        return {
          url: "/skills",
          method: "GET",
          params: params,
        }
      },
      providesTags: ["skills"],
    }),

    getSkill: builder.query({
      query: id => {
        if (!id) return null
        return {
          url: `/skills/${id}`,
          method: "GET",
        }
      },
      providesTags: ["skills"],
    }),

    updateSkill: builder.mutation({
      query: ({ id, ...skillData }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body: skillData,
      }),
      invalidatesTags: ["skills"],
    }),

    deleteSkill: builder.mutation({
      query: id => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skills"],
    }),
  }),
})

export const {
  useAddSkillMutation,
  useDeleteSkillMutation,
  useGetSkillQuery,
  useGetSkillsQuery,
  useUpdateSkillMutation,
} = skillApi
