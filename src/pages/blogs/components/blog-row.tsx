/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBlog } from "@/interface"
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
import { useDeleteBlogMutation } from "@/redux/features/blog/blog-api"

const BlogRow = ({ blog }: { blog: IBlog }) => {
  const [deleteBlog] = useDeleteBlogMutation()
  const handleDelete = async () => {
    const toastId = toast.loading("Deleting blog...")

    try {
      const res = await deleteBlog(blog.id)
      toast.success(res?.data?.message || "Blog delete successfully!", {
        id: toastId,
      })
    } catch (error: any) {
      toast.error(error?.data?.message || "Unbale to delete blog", {
        id: toastId,
      })
    }
  }

  return (
    <TableRow className="grid @[42rem]:table-row !border !border-border rounded-md py-3 px-1">
      <TableCell className="py-0 pb-2 font-semibold @[42rem]:py-2 @[42rem]:font-normal">
        {blog.title}
      </TableCell>
      <TableCell className="py-0 @[42rem]:py-2 text-muted-foreground">
        <span className="@[42rem]:hidden">Category: </span>
        {blog.category.label}
      </TableCell>
      <TableCell className="py-0 @[42rem]:py-2 text-muted-foreground">
        <span className="@[42rem]:hidden">Publish Date: </span>
        {format(new Date(blog.createdAt), "MMM d, yyyy")}
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
            asChild
          >
            <Link to={`/blogs/edit/${blog.id}`}>Edit</Link>
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
                  blog from database.
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
export default BlogRow
