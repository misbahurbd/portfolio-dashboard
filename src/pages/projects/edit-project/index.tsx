import { useGetProjectQuery } from "@/redux/features/project/project-api"
import { useParams } from "react-router-dom"
import EditProjectForm from "./components/edit-project-form"
import { Helmet } from "react-helmet-async"

const EditProjectPage = () => {
  const { id } = useParams()
  const {
    data: projectData,
    isFetching,
    isLoading,
  } = useGetProjectQuery({ id })

  if (!projectData || isFetching || isLoading) return null

  return (
    <>
      <Helmet>
        <title>Edit Project - Misbahur Rahman Dashboard</title>
      </Helmet>
      <EditProjectForm initialData={projectData?.data} />
    </>
  )
}
export default EditProjectPage
