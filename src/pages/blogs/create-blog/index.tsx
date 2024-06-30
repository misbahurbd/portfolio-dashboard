import PageHeader from "@/components/shared/page-header"
import { Form } from "@/components/ui/form"
import { createBlogFormSchema } from "@/validations/blog.validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const CreateBlog = () => {
  const form = useForm<z.infer<typeof createBlogFormSchema>>({
    resolver: zodResolver(createBlogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      category: "",
      featurePhoto: "",
      metadata: {
        title: "",
        description: "",
        socialImg: "",
      },
    },
  })

  const onSubmit = async (values: z.infer<typeof createBlogFormSchema>) => {
    console.log({ blogData: values })
  }

  return (
    <>
      <PageHeader title="Create new blog" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex flex-col gap-4"></div>
        </form>
      </Form>
    </>
  )
}
export default CreateBlog
