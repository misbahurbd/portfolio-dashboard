import FormCheckbox from "@/components/shared/form-checkbox"
import FormInput from "@/components/shared/form-input"
import FormSelect from "@/components/shared/form-select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { experiencesLevels } from "@/constants/skill"
import { ISkill } from "@/interface"
import { skillFormSchema } from "@/validations/skill.validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface SkillFormProps {
  onSubmit: (values: z.infer<typeof skillFormSchema>) => void
  isLoading: boolean
  btnLabel: string
  initialData?: ISkill
}

const SkillForm: React.FC<SkillFormProps> = ({
  onSubmit,
  isLoading,
  btnLabel,
  initialData,
}) => {
  const form = useForm<z.infer<typeof skillFormSchema>>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      label: initialData?.label || "",
      experiencesLevel: initialData?.experiencesLevel || "",
      isFeatured: initialData?.isFeatured || false,
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormInput
          form={form}
          label="Label"
          placeholder="Skill label"
          name="label"
          disabled={isLoading}
        />
        <FormSelect
          form={form}
          label="Experiences level"
          name="experiencesLevel"
          data={experiencesLevels}
          placeholder="Select level"
          disabled={isLoading}
        />
        <FormCheckbox
          form={form}
          name="isFeatured"
          label="Feature skill"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="mt-4"
          disabled={isLoading}
        >
          {btnLabel}
        </Button>
      </form>
    </Form>
  )
}
export default SkillForm
