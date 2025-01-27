/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/features/blog/blog-api"
import { createBlogFormSchema } from "@/validations/blog.validations"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import BlogForm from "../components/blog-form"
import { Helmet } from "react-helmet-async"

const EditBlogPage = () => {
  const { id } = useParams()
  const { data: blogData, isFetching } = useGetBlogQuery(id)
  const [updateBlog, { isLoading }] = useUpdateBlogMutation()
  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof createBlogFormSchema>) => {
    try {
      const res = await updateBlog({ id, ...values })
      toast.success(res?.data?.message)
      navigate("/blogs")
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to update blog")
    }
  }

  if (isFetching) return null

  return (
    <>
      <Helmet>
        <title>Edit Blog - Misbahur Rahman Dashboard</title>
      </Helmet>
      <BlogForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        initialData={blogData?.data}
        btnLabel="Update"
      />
    </>
  )
}
export default EditBlogPage
