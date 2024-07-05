/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/ui/modal"
import { useSkillModal } from "@/hooks/use-skill-modal"
import SkillForm from "@/pages/skills/components/skill-form"
import { useAddSkillMutation } from "@/redux/features/skill/skill-api"
import { skillFormSchema } from "@/validations/skill.validations"
import { toast } from "sonner"
import { z } from "zod"

const AddSkillForm = () => {
  const [addSkill, { isLoading }] = useAddSkillMutation()
  const { isOpen, onClose } = useSkillModal()

  const onSubmit = async (values: z.infer<typeof skillFormSchema>) => {
    try {
      const res = await addSkill(values)
      if (res.data?.success) {
        toast.success(res?.data?.message)
        onClose()
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to add skill")
    }
  }

  return (
    <Modal
      title="Add Skill"
      isOpen={isOpen}
      onClose={onClose}
    >
      <SkillForm
        onSubmit={onSubmit}
        btnLabel="Add Skill"
        isLoading={isLoading}
      />
    </Modal>
  )
}
export default AddSkillForm
