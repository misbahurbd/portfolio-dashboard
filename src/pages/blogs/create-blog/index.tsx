/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCreateBlogMutation } from "@/redux/features/blog/blog-api"
import { createBlogFormSchema } from "@/validations/blog.validations"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import BlogForm from "../components/blog-form"

const CreateBlogPage = () => {
  const [createBlog, { isLoading }] = useCreateBlogMutation()
  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof createBlogFormSchema>) => {
    try {
      const res = await createBlog(values)
      toast.success(res?.data?.message)
      navigate("/blogs")
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to create blog")
    }
  }

  return (
    <BlogForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      label="Publish Blog"
    />
  )
}
export default CreateBlogPage
