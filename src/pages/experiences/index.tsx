import EmptyResult from "@/components/shared/empty-result"
import Fetching from "@/components/shared/fetching"
import PageHeader from "@/components/shared/page-header"
import PaginationComponent from "@/components/shared/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IExperience } from "@/interface"
import { useGetExperiencesQuery } from "@/redux/features/experience/experience-api"
import { PiBriefcaseDuotone } from "react-icons/pi"
import { useSearchParams } from "react-router-dom"
import ExperienceRow from "./components/experience-row"
import { Helmet } from "react-helmet-async"

const ExperiencesPage = () => {
  const [searchParams] = useSearchParams()

  const {
    data: experiencesData,
    isLoading,
    isFetching,
  } = useGetExperiencesQuery({ query: Object.fromEntries([...searchParams]) })

  const totalPage =
    Math.ceil(experiencesData?.meta?.total / experiencesData?.meta?.limit) || 0
  const page = experiencesData?.meta?.page || 1

  console.log({
    experiencesData,
    isLoading,
    isFetching,
  })

  return (
    <>
      <Helmet>
        <title>Expriences - Misbahur Rahman Dashboard</title>
      </Helmet>
      <PageHeader
        title="Experiences"
        button={[{ label: "Add New Experience", href: "/experiences/create" }]}
      />
      {experiencesData &&
        experiencesData.data &&
        experiencesData.data.length == 0 && (
          <EmptyResult
            icon={PiBriefcaseDuotone}
            label="No experience found yet!"
          />
        )}

      {experiencesData &&
        experiencesData.data &&
        experiencesData.data.length > 0 && (
          <Table className="rounded-md @[42rem]:border @[42rem]:border-border">
            <TableHeader className="hidden @[42rem]:table-header-group">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="relative grid gap-2 @[42rem]:table-row-group">
              {isFetching && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Fetching isFetching={isFetching} />
                  </TableCell>
                </TableRow>
              )}
              {experiencesData.data.map((experience: IExperience) => (
                <ExperienceRow
                  key={experience.id}
                  experience={experience}
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
export default ExperiencesPage
