import EmptyResult from "@/components/shared/empty-result"
import PageHeader from "@/components/shared/page-header"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IProject } from "@/interface"
import { useGetProjectsQuery } from "@/redux/features/project/project-api"
import { PiDiamondsFourDuotone } from "react-icons/pi"
import { useSearchParams } from "react-router-dom"
import ProjectRow from "./components/project-row"
import Fetching from "@/components/shared/fetching"
import PaginationComponent from "@/components/shared/pagination"
import { Helmet } from "react-helmet-async"

const ProjectsPage = () => {
  const [searchParams] = useSearchParams()

  const {
    data: projectsData,
    isLoading,
    isFetching,
  } = useGetProjectsQuery({ query: Object.fromEntries([...searchParams]) })

  const totalPage =
    Math.ceil(projectsData?.meta?.total / projectsData?.meta?.limit) || 0
  const page = projectsData?.meta?.page || 1

  console.log({
    projectsData,
    isLoading,
    isFetching,
  })

  return (
    <>
      <Helmet>
        <title>Projects - Misbahur Rahman Dashboard</title>
      </Helmet>
      <PageHeader
        title="Projects"
        button={[{ label: "Add New Project", href: "/projects/create" }]}
      />
      {projectsData && projectsData.data && projectsData.data.length == 0 && (
        <EmptyResult
          icon={PiDiamondsFourDuotone}
          label="No project found yet!"
        />
      )}
      {projectsData && projectsData.data && projectsData.data.length > 0 && (
        <Table className="rounded-md @[42rem]:border @[42rem]:border-border">
          <TableHeader className="hidden @[42rem]:table-row-group">
            <TableRow>
              <TableHead className="text-nowrap">Project Image</TableHead>
              <TableHead className="text-nowrap">Title</TableHead>
              <TableHead className="text-nowrap">Publish Date</TableHead>
              <TableHead className="text-nowrap">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative grid gap-2 @[32rem]:grid-cols-2 @[42rem]:table-row-group">
            {isFetching && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Fetching isFetching={isFetching} />
                </TableCell>
              </TableRow>
            )}
            {projectsData.data.map((project: IProject) => (
              <ProjectRow
                key={project.id}
                project={project}
              />
            ))}
          </TableBody>
        </Table>
      )}
      <PaginationComponent
        currentPage={page}
        totalPages={totalPage}
      />
    </>
  )
}
export default ProjectsPage
