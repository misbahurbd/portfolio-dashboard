import { useGetProjectQuery } from "@/redux/features/project/project-api"
import { useParams } from "react-router-dom"
import EditProjectForm from "./components/edit-project-form"

const EditProjectPage = () => {
  const { id } = useParams()
  const {
    data: projectData,
    isFetching,
    isLoading,
  } = useGetProjectQuery({ id })

  if (!projectData || isFetching || isLoading) return null

  return <EditProjectForm initialData={projectData?.data} />
}
export default EditProjectPage
