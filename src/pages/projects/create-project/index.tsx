/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from "@/components/shared/editor"
import { ClipLoader as Spinners } from "react-spinners"
import FormImageUploader from "@/components/shared/form-image-uploader"
import FormInput from "@/components/shared/form-input"
import FormTextarea from "@/components/shared/form-textarea"
import FormTitleInput from "@/components/shared/form-title-input"
import MultiImageUploader from "@/components/shared/multi-image-uploader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { createProjectFormSchema } from "@/validations/project.validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import FormMultiSelector from "@/components/shared/form-multi-selector"
import { sourceCoudeLabels, technologies } from "@/constants/project"
import { useCreateProjectMutation } from "@/redux/features/project/project-api"
import FormSelect from "@/components/shared/form-select"
import { Helmet } from "react-helmet-async"

const CreateProjectPage = () => {
  const [createProject, { isLoading }] = useCreateProjectMutation()
  const [imgUploading, setImgUploading] = useState(0)
  const [imgLoading, setImgLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof createProjectFormSchema>>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: "",
      challenges: "",
      solutions: "",
      featurePhoto: "",
      photos: [],
      skills: [],
      sourceLinks: [
        {
          label: "",
          link: "",
        },
      ],
      metadata: {
        title: "",
        description: "",
        socialImg: "",
      },
    },
  })

  const { fields, append } = useFieldArray({
    name: "sourceLinks",
    control: form.control,
  })

  const onSubmit = async (values: z.infer<typeof createProjectFormSchema>) => {
    try {
      const res = await createProject(values)
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate("/projects")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to create blog")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4"
      >
        <Helmet>
          <title>Add Project - Misbahur Rahman Dashboard</title>
        </Helmet>
        <div className="flex flex-1 flex-col gap-4">
          <FormTitleInput
            form={form}
            name="title"
            placeholder="Add project title"
            disabled={isLoading}
          />
          <div>
            <h4 className="px-10 font-bold">Challenges</h4>
            <div className="min-h-32 -mx-3">
              <Editor
                form={form}
                name="challenges"
              />
            </div>
          </div>
          <div className="px-10">
            <h4 className="font-bold">Project Photos</h4>
            <div className="flex gap-3 flex-wrap">
              {form.watch("photos").map((photo: string) => (
                <img
                  className="block size-32 object-cover rounded-md"
                  key={photo}
                  src={photo}
                />
              ))}
              {Array.from({ length: imgUploading }).map((_, i) => (
                <div
                  key={"img" + i}
                  className="size-32 grid place-items-center bg-secondary rounded-md"
                >
                  <Spinners
                    color="blue"
                    size={32}
                  />
                </div>
              ))}
              <MultiImageUploader
                form={form}
                name="photos"
                disabled={isLoading}
                setCount={setImgUploading}
                setImgLoading={setImgLoading}
                className="aspect-square !size-32 rounded-md"
              />
            </div>
          </div>
          <div>
            <h4 className="px-10 font-bold">Solutions</h4>
            <div className="min-h-32 -mx-3">
              <Editor
                form={form}
                name="solutions"
              />
            </div>
          </div>
        </div>
        <div className="md:w-72 lg:w-80 md:shrink-0 ">
          <div className="md:sticky md:top-2 flex flex-col gap-4">
            <Accordion
              type="multiple"
              defaultValue={["item-1", "item-2", "item-3", "item-4"]}
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
                  Source Links
                </AccordionTrigger>
                <AccordionContent className="px-3 py-2 pb-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex gap-1"
                    >
                      <FormSelect
                        form={form}
                        name={`sourceLinks.${index}.label`}
                        data={sourceCoudeLabels}
                        placeholder="Select label"
                        disabled={isLoading}
                      />
                      <FormInput
                        form={form}
                        name={`sourceLinks.${index}.link`}
                        placeholder="Type link here"
                        type="url"
                        disabled={isLoading}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ label: "", link: "" })}
                  >
                    Add Link
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
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
                value="item-4"
                className="border-none"
              >
                <AccordionTrigger className="px-3 py-2 bg-secondary/80 rounded-md">
                  Technology
                </AccordionTrigger>
                <AccordionContent className="px-3 py-2 pb-4 flex flex-col gap-2">
                  <div className="flex gap-2 flex-wrap">
                    {form.watch("skills").map(skill => (
                      <p
                        key={skill}
                        className="px-2 py-1 text-muted-foreground rounded border border-border shadow bg-background"
                      >
                        {technologies.find(item => item.value == skill)?.label}
                      </p>
                    ))}
                  </div>
                  <FormMultiSelector
                    form={form}
                    data={technologies}
                    name="skills"
                    placeholder="Select project technology"
                    disabled={isLoading}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              type="submit"
              disabled={isLoading || imgLoading}
            >
              Publish
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
export default CreateProjectPage
