import EmptyResult from "@/components/shared/empty-result"
import PageHeader from "@/components/shared/page-header"
import PaginationComponent from "@/components/shared/pagination"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ISkill } from "@/interface"
import { PiLightbulbFilamentDuotone } from "react-icons/pi"
import { useSearchParams } from "react-router-dom"
import SkillRow from "./components/skill-row"
import { Helmet } from "react-helmet-async"
import { useGetSkillsQuery } from "@/redux/features/skill/skill-api"
import { useSkillModal } from "@/hooks/use-skill-modal"
import LoadingUi from "@/components/shared/loading-ui"

const SkillsPage = () => {
  const { onOpen } = useSkillModal()
  const [searchParams] = useSearchParams()

  const { data: skillsData, isFetching } = useGetSkillsQuery({
    query: Object.fromEntries([...searchParams]),
  })

  const totalPage =
    Math.ceil(skillsData?.meta?.total / skillsData?.meta?.limit) || 0
  const page = skillsData?.meta?.page || 1

  return (
    <>
      <Helmet>
        <title>Skills - Misbahur Rahman Dashboard</title>
      </Helmet>
      <PageHeader
        title="All Skills"
        button={[{ label: "Add New Skill", onClick: onOpen }]}
      />
      {isFetching && <LoadingUi subject="skill" />}
      {skillsData && skillsData.data && skillsData.data.length == 0 && (
        <EmptyResult
          icon={PiLightbulbFilamentDuotone}
          label="No skill found yet!"
        />
      )}
      {skillsData && skillsData.data && skillsData.data.length > 0 && (
        <Table className="rounded-md @[42rem]:border @[42rem]:border-border">
          <TableHeader className="hidden @[42rem]:table-row-group">
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Experiences Level</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skillsData.data.map((skill: ISkill) => (
              <SkillRow
                key={skill.id}
                skill={skill}
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
export default SkillsPage
