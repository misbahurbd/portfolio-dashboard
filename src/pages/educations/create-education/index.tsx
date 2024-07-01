/* eslint-disable @typescript-eslint/no-explicit-any */
import FormDatePicker from "@/components/shared/form-date-picker"
import FormInput from "@/components/shared/form-input"
import FormTextarea from "@/components/shared/form-textarea"
import PageHeader from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateEducationMutation } from "@/redux/features/education/education-api"
import { createEducationFormSchema } from "@/validations/education.validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

const CreateEducationPage = () => {
  const [createEducation, { isLoading }] = useCreateEducationMutation()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof createEducationFormSchema>>({
    resolver: zodResolver(createEducationFormSchema),
    defaultValues: {
      school: "",
      location: "",
      degree: "",
      description: "",
      fieldOfStudy: "",
    },
  })

  const onSubmit = async (
    values: z.infer<typeof createEducationFormSchema>
  ) => {
    try {
      const res = await createEducation(values)
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate("/educations")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to create education")
    }
  }

  return (
    <div className="w-full max-w-[650px] space-y-6">
      <PageHeader title="Add New Education" />
      <Form {...form}>
        <form
          className="grid gap-2 sm:grid-cols-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            form={form}
            name="school"
            label="School"
            className="sm:col-span-2"
            placeholder="School"
            disabled={isLoading}
          />
          <FormInput
            form={form}
            name="location"
            label="Location"
            className="sm:col-span-2"
            placeholder="Location"
            disabled={isLoading}
          />
          <FormDatePicker
            form={form}
            name="startDate"
            label="Start Date"
            placeholder="Select Start Date"
            required
            range="past"
            defaultDate={form.watch("startDate")?.toLocaleString()}
            disabled={isLoading}
          />
          <FormDatePicker
            form={form}
            name="endDate"
            label="End Date (or expected)"
            range="past"
            required
            startDate={form.watch("startDate")?.toLocaleString()}
            defaultDate={
              form.watch("endDate")?.toLocaleString() ||
              form.watch("startDate")?.toLocaleString()
            }
            placeholder="Select Start Date"
            disabled={isLoading}
          />
          <FormInput
            form={form}
            name="degree"
            label="Degree"
            className="sm:col-span-2"
            placeholder="Degree"
            disabled={isLoading}
          />
          <FormInput
            form={form}
            name="fieldOfStudy"
            label="Field of Study"
            className="sm:col-span-2"
            placeholder="Field of Study"
            disabled={isLoading}
          />
          <FormTextarea
            form={form}
            name="description"
            label="Description"
            className="sm:col-span-2"
            counter
            placeholder="Description"
            disabled={isLoading}
          />
          <div className="sm:col-span-2 ">
            <Button
              type="submit"
              disabled={isLoading}
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default CreateEducationPage
