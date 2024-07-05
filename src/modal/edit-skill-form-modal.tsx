/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/ui/modal"
import { useEditSkillModal } from "@/hooks/use-edit-skill-modal"
import SkillForm from "@/pages/skills/components/skill-form"
import {
  useGetSkillQuery,
  useUpdateSkillMutation,
} from "@/redux/features/skill/skill-api"
import { skillFormSchema } from "@/validations/skill.validations"
import { toast } from "sonner"
import { z } from "zod"

const EditSkillForm = () => {
  const [updateSkill, { isLoading }] = useUpdateSkillMutation()
  const { isOpen, onClose, id } = useEditSkillModal()
  const { data: skillData, isFetching } = useGetSkillQuery(id)

  const onSubmit = async (values: z.infer<typeof skillFormSchema>) => {
    try {
      const res = await updateSkill({ id, ...values })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        onClose()
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to update skill")
    }
  }

  return (
    <Modal
      title="Edit Skill"
      isOpen={isOpen}
      onClose={onClose}
    >
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <SkillForm
          onSubmit={onSubmit}
          btnLabel="Update Skill"
          isLoading={isLoading}
          initialData={skillData?.data}
        />
      )}
    </Modal>
  )
}
export default EditSkillForm
