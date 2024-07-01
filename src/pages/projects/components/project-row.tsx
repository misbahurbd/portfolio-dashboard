/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { IProject } from "@/interface"
import { useDeleteProjectMutation } from "@/redux/features/project/project-api"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const ProjectRow = ({ project }: { project: IProject }) => {
  const [deleteProject] = useDeleteProjectMutation()
  const handleDelete = async () => {
    const toastId = toast.loading("Deleting project...")

    try {
      const res = await deleteProject(project.id)
      toast.success(res?.data?.message || "Project delete successfully!", {
        id: toastId,
      })
    } catch (error: any) {
      toast.error(error?.data?.message || "Unbale to delete project", {
        id: toastId,
      })
    }
  }

  return (
    <TableRow className="grid @[42rem]:table-row !border !border-border rounded-md py-3 px-1">
      <TableCell>
        <img
          className="shrink-0 w-full @[42rem]:w-auto aspect-video h-40 @[42rem]:h-16 rounded object-cover"
          src={project.featurePhoto}
        />
      </TableCell>
      <TableCell className="py-0 font-semibold @[42rem]:font-normal @[42rem]:text-sm">
        {project.title}
      </TableCell>
      <TableCell className="text-nowrap">
        <span className="mr-1 font-medium @[42rem]:hidden ">Publish Date:</span>
        {format(new Date(project.createdAt), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="w-max">
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
            asChild
          >
            <Link to={`/projects/edit/${project.id}`}>Edit</Link>
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
                  project from database.
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
export default ProjectRow
