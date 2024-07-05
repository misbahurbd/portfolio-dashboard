/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISkill } from "@/interface"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useEditSkillModal } from "@/hooks/use-edit-skill-modal"
import { useDeleteSkillMutation } from "@/redux/features/skill/skill-api"

const SkillRow = ({ skill }: { skill: ISkill }) => {
  const [deleteSkill] = useDeleteSkillMutation()
  const { onOpen } = useEditSkillModal()

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting skill...")

    try {
      const res = await deleteSkill(skill.id)
      toast.success(res?.data?.message || "Skill delete successfully!", {
        id: toastId,
      })
    } catch (error: any) {
      toast.error(error?.data?.message || "Unbale to delete skill", {
        id: toastId,
      })
    }
  }

  return (
    <TableRow className="grid @[42rem]:table-row !border !border-border rounded-md py-3 px-1">
      <TableCell className="py-0 pb-2 font-semibold @[42rem]:py-2 @[42rem]:font-normal">
        {skill.label}
      </TableCell>
      <TableCell className="py-0 @[42rem]:py-2 text-muted-foreground">
        <span className="@[42rem]:hidden">Experiences Level: </span>
        {skill.experiencesLevel}
      </TableCell>
      <TableCell className="py-0 @[42rem]:py-2 text-muted-foreground">
        <span className="@[42rem]:hidden">Added Date: </span>
        {format(new Date(skill.createdAt), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="w-max py-0 @[42rem]:py-2">
        <div className="w-max flex gap-3">
          <Button
            variant="link"
            className="p-0"
            asChild
          >
            <Link to="">View</Link>
          </Button>
          <Button
            variant="link"
            className="p-0"
            onClick={() => onOpen(skill.id)}
          >
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="link"
                className="p-0"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  skill from database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )
}
export default SkillRow
