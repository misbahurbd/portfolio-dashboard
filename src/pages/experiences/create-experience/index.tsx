/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import PageHeader from "@/components/shared/page-header"
import ExperienceForm from "../components/experience-form"
import { experienceFormSchema } from "@/validations/experience.validation"
import { useCreateExperienceMutation } from "@/redux/features/experience/experience-api"
import { Helmet } from "react-helmet-async"

const CreateExperiencePage = () => {
  const [createExperience, { isLoading }] = useCreateExperienceMutation()
  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof experienceFormSchema>) => {
    try {
      const res = await createExperience(values)
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate("/experiences")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to create experience")
    }
  }

  return (
    <div className="w-full max-w-[650px] space-y-6">
      <Helmet>
        <title>Add Experience - Misbahur Rahman Dashboard</title>
      </Helmet>
      <PageHeader title="Add New Experience" />
      <ExperienceForm
        btnLabel="Publish"
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  )
}
export default CreateExperiencePage
