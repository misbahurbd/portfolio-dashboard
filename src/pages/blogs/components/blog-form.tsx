import Editor from "@/components/shared/editor"
import FormImageUploader from "@/components/shared/form-image-uploader"
import FormInput from "@/components/shared/form-input"
import FormSelect from "@/components/shared/form-select"
import FormTextarea from "@/components/shared/form-textarea"
import FormTitleInput from "@/components/shared/form-title-input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { blogCategories } from "@/constants/blog"
import { IBlog } from "@/interface"
import { createBlogFormSchema } from "@/validations/blog.validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface BlogFormProps {
  onSubmit: (values: z.infer<typeof createBlogFormSchema>) => void
  isLoading: boolean
  btnLabel: string
  initialData?: IBlog
}

const BlogForm: React.FC<BlogFormProps> = ({
  onSubmit,
  isLoading,
  btnLabel,
  initialData,
}) => {
  const [imgLoading, setImgLoading] = useState(false)

  const form = useForm<z.infer<typeof createBlogFormSchema>>({
    resolver: zodResolver(createBlogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category?.label || "",
      featurePhoto: initialData?.featurePhoto || "",
      metadata: {
        title: initialData?.metadata?.title || "",
        description: initialData?.metadata?.description || "",
        socialImg: initialData?.metadata?.socialImg || "",
      },
    },
  })
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex flex-1 flex-col gap-4">
          <FormTitleInput
            form={form}
            name="title"
            placeholder="Add blog title"
            disabled={isLoading}
          />
          <div className="min-h-80 -mx-3">
            <Editor
              form={form}
              name="content"
            />
          </div>
        </div>
        <div className="md:w-72 lg:w-80 md:shrink-0 ">
          <div className="md:sticky md:top-2 flex flex-col gap-4">
            <Accordion
              type="multiple"
              defaultValue={["item-1"]}
              className="w-full space-y-2"
            >
              <AccordionItem
                value="item-1"
                className="border-none"
              >
                <AccordionTrigger className="px-3 py-2 bg-secondary/80 rounded-md">
                  Feature Image
                </AccordionTrigger>
                <AccordionContent className="px-3 py-2 pb-4">
                  <FormImageUploader
                    form={form}
                    name="featurePhoto"
                    setImgLoading={setImgLoading}
                    placeholder="Select blog feature image"
                    className="aspect-video !h-auto"
                    disabled={isLoading}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-none"
              >
                <AccordionTrigger className="px-3 py-2 bg-secondary/80 rounded-md">
                  SEO Metadata
                </AccordionTrigger>
                <AccordionContent className="px-3 py-2 pb-4">
                  <FormInput
                    form={form}
                    name="metadata.title"
                    placeholder="Title"
                    label="SEO Title"
                    counter
                    max={70}
                    className="bg-background"
                    disabled={isLoading}
                  />
                  <FormTextarea
                    form={form}
                    name="metadata.description"
                    placeholder="Description"
                    label="SEO Description"
                    counter
                    max={120}
                    className="bg-background"
                    disabled={isLoading}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-none"
              >
                <AccordionTrigger className="px-3 py-2 bg-secondary/80 rounded-md">
                  Category
                </AccordionTrigger>
                <AccordionContent className="px-3 py-2 pb-4">
                  <FormSelect
                    form={form}
                    name="category"
                    placeholder="Category"
                    className="bg-background"
                    data={blogCategories.map(ct => ({
                      label: ct.label,
                      value: ct.label,
                    }))}
                    disabled={isLoading}
                  />
                  {/* <Button
                    variant="link"
                    className="p-0 text-xs"
                    type="button"
                  >
                    Add new category
                  </Button> */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              type="submit"
              disabled={isLoading || imgLoading}
            >
              {btnLabel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
export default BlogForm
