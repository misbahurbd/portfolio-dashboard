import PageHeader from "@/components/shared/page-header"

const BlogsPage = () => {
  return (
    <>
      <PageHeader
        title="All blogs"
        button={[{ label: "Add new blog", href: "/blogs/create" }]}
      />
    </>
  )
}
export default BlogsPage
