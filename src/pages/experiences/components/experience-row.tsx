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
import { IExperience } from "@/interface"
import { useUpdateExperienceMutation } from "@/redux/features/experience/experience-api"

import { format } from "date-fns"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const ExperienceRow = ({ experience }: { experience: IExperience }) => {
  const [updateExperience] = useUpdateExperienceMutation()

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting project...")

    try {
      const res = await updateExperience(experience.id)
      toast.success(res?.data?.message || "Experience delete successfully!", {
        id: toastId,
      })
    } catch (error: any) {
      toast.error(error?.data?.message || "Unbale to delete experience", {
        id: toastId,
      })
    }
  }

  return (
    <TableRow
      key={experience.id}
      className="grid @[42rem]:table-row !border !border-border rounded-md py-3 px-1"
    >
      <TableCell className="py-0 @[42rem]:py-2">
        <h3 className="font-bold">
          {experience.company} - {experience.title}
        </h3>
        <p className="text-muted-foreground text-sm">{experience.location}</p>
        <p className="text-muted-foreground text-sm">
          {format(new Date(experience.startDate), "MMM d, yyyy")} -{" "}
          {experience.endDate ? (
            <>{format(new Date(experience.endDate), "MMM d, yyyy")}</>
          ) : (
            <>Present</>
          )}
        </p>
      </TableCell>
      <TableCell className="py-0 @[42rem]:py-2">
        {format(new Date(experience.createdAt), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="w-max py-0 @[42rem]:py-2">
        <div className="w-max flex gap-3">
          <Button
            variant="link"
            className="p-0"
            asChild
          >
            <Link to={`/experiences/edit/${experience.id}`}>Edit</Link>
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
                  experience from database.
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
export default ExperienceRow
