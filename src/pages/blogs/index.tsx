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
import { IBlog } from "@/interface"
import { useGetBlogsQuery } from "@/redux/features/blog/blog-api"
import { PiFilesDuotone } from "react-icons/pi"
import { useSearchParams } from "react-router-dom"
import BlogRow from "./components/blog-row"
import { Helmet } from "react-helmet-async"
import LoadingUi from "@/components/shared/loading-ui"

const BlogsPage = () => {
  const [searchParams] = useSearchParams()

  const { data: blogsData, isFetching } = useGetBlogsQuery({
    query: Object.fromEntries([...searchParams]),
  })

  const totalPage =
    Math.ceil(blogsData?.meta?.total / blogsData?.meta?.limit) || 0
  const page = blogsData?.meta?.page || 1

  return (
    <>
      <Helmet>
        <title>Blog - Misbahur Rahman Dashboard</title>
      </Helmet>
      <PageHeader
        title="All Blogs"
        button={[{ label: "Add New Blog", href: "/blogs/create" }]}
      />
      {blogsData && blogsData.data && blogsData.data.length == 0 && (
        <EmptyResult
          icon={PiFilesDuotone}
          label="No blog found yet!"
        />
      )}
      {blogsData && blogsData.data && blogsData.data.length > 0 && (
        <Table className="rounded-md @[42rem]:border @[42rem]:border-border">
          <TableHeader className="hidden @[42rem]:table-row-group">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isFetching &&
              blogsData.data.map((blog: IBlog) => (
                <BlogRow
                  key={blog.id}
                  blog={blog}
                />
              ))}
          </TableBody>
        </Table>
      )}

      {isFetching && <LoadingUi subject="blog" />}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPage}
      />
    </>
  )
}
export default BlogsPage
