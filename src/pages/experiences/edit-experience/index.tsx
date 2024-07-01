/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod"
import { toast } from "sonner"
import PageHeader from "@/components/shared/page-header"
import { useNavigate, useParams } from "react-router-dom"
import { experienceFormSchema } from "@/validations/experience.validation"
import ExperienceForm from "../components/experience-form"
import {
  useGetExperienceQuery,
  useUpdateExperienceMutation,
} from "@/redux/features/experience/experience-api"

const EditExperiencePage = () => {
  const { id } = useParams()

  const [updateExperience, { isLoading }] = useUpdateExperienceMutation()
  const { data: experienceData, isFetching } = useGetExperienceQuery(id)
  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof experienceFormSchema>) => {
    try {
      const res = await updateExperience({
        id: experienceData.data.id,
        ...values,
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate("/experiences")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to create education")
    }
  }

  if (isFetching) return null

  return (
    <div className="w-full max-w-[650px] space-y-6">
      <PageHeader title="Update Education" />
      <ExperienceForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        btnLabel="Update Education"
        initialData={experienceData?.data}
      />
    </div>
  )
}
export default EditExperiencePage
