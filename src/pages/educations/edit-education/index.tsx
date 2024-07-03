/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@/components/shared/page-header"

import {
  useGetEducationQuery,
  useUpdateEducationMutation,
} from "@/redux/features/education/education-api"
import { createEducationFormSchema } from "@/validations/education.validations"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import EducationForm from "../components/education-form"
import { Helmet } from "react-helmet-async"

const EditEducationPage = () => {
  const { id } = useParams()

  const [updateEducation, { isLoading }] = useUpdateEducationMutation()
  const { data: educationData, isFetching } = useGetEducationQuery(id)
  const navigate = useNavigate()

  const onSubmit = async (
    values: z.infer<typeof createEducationFormSchema>
  ) => {
    try {
      const res = await updateEducation({
        id: educationData.data.id,
        ...values,
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate("/educations")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to create education")
    }
  }

  if (isFetching) return null

  return (
    <div className="w-full max-w-[650px] space-y-6">
      <Helmet>
        <title>Edit Education - Misbahur Rahman Dashboard</title>
      </Helmet>
      <PageHeader title="Update Education" />
      <EducationForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        btnLabel="Update"
        initialData={educationData?.data}
      />
    </div>
  )
}
export default EditEducationPage
