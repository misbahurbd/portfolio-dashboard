/* eslint-disable @typescript-eslint/no-explicit-any */
import FormDatePicker from "@/components/shared/form-date-picker"
import FormInput from "@/components/shared/form-input"
import FormTextarea from "@/components/shared/form-textarea"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { experienceFormSchema } from "@/validations/experience.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface ExperienceFormProps {
  onSubmit: (values: z.infer<typeof experienceFormSchema>) => void
  isLoading: boolean
  btnLabel: string
  initialData?: z.infer<typeof experienceFormSchema>
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  onSubmit,
  isLoading,
  btnLabel,
  initialData,
}) => {
  const form = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      company: initialData?.company || "",
      title: initialData?.title || "",
      location: initialData?.location || "",
      startDate: initialData ? new Date(initialData.startDate) : undefined,
      endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
      description: initialData?.description || "",
    },
  })

  return (
    <Form {...form}>
      <form
        className="grid gap-2 sm:grid-cols-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          form={form}
          name="title"
          label="Title"
          className="sm:col-span-2"
          placeholder="Title"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="company"
          label="Company"
          className="sm:col-span-2"
          placeholder="Company"
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
          range="range"
          defaultDate={form.watch("startDate")?.toLocaleString()}
          disabled={isLoading}
        />
        <FormDatePicker
          form={form}
          name="endDate"
          label="End Date (if leave)"
          range="range"
          startDate={form.watch("startDate")?.toLocaleString()}
          defaultDate={
            form.watch("endDate")?.toLocaleString() ||
            form.watch("startDate")?.toLocaleString()
          }
          placeholder="Select Start Date"
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
            {btnLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default ExperienceForm
