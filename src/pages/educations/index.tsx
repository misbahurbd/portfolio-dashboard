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
import { IEducation } from "@/interface"
import { useGetEducationsQuery } from "@/redux/features/education/education-api"
import { PiGraduationCapDuotone } from "react-icons/pi"
import { useSearchParams } from "react-router-dom"
import EducationRow from "./components/education-row"
import { Helmet } from "react-helmet-async"

const EducationPage = () => {
  const [searchParams] = useSearchParams()

  const {
    data: educationData,
    isLoading,
    isFetching,
  } = useGetEducationsQuery({ query: Object.fromEntries([...searchParams]) })

  const totalPage =
    Math.ceil(educationData?.meta?.total / educationData?.meta?.limit) || 0
  const page = educationData?.meta?.page || 1

  console.log({
    educationData,
    isLoading,
    isFetching,
  })

  return (
    <>
      <Helmet>
        <title>Educations - Misbahur Rahman Dashboard</title>
      </Helmet>
      <PageHeader
        title="Educations"
        button={[{ label: "Add New Education", href: "/educations/create" }]}
      />
      {educationData &&
        educationData.data &&
        educationData.data.length == 0 && (
          <EmptyResult
            icon={PiGraduationCapDuotone}
            label="No education found yet!"
          />
        )}

      {educationData && educationData.data && educationData.data.length > 0 && (
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
            {educationData.data.map((edu: IEducation) => (
              <EducationRow
                key={edu.id}
                edu={edu}
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
export default EducationPage
