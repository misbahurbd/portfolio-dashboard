import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"

const PaginationComponent = ({
  totalPages,
  currentPage,
}: {
  totalPages: number
  currentPage: number
}) => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  function createPageArray(currentPage: number, totalPages: number): number[] {
    const pageArray: number[] = []
    const delta = 2 // We want a total of 5 pages, so 2 pages before and 2 pages after the current page

    let start = Math.max(1, currentPage - delta)
    let end = Math.min(totalPages, currentPage + delta)

    // Adjust the range if we're near the start or end
    if (currentPage - start < delta) {
      end = Math.min(totalPages, end + (delta - (currentPage - start)))
    }
    if (end - currentPage < delta) {
      start = Math.max(1, start - (delta - (end - currentPage)))
    }

    for (let i = start; i <= end; i++) {
      pageArray.push(i)
    }

    return pageArray
  }

  const pageNavs = createPageArray(currentPage, totalPages)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            to={createPageURL(currentPage - 1)}
            className={cn(
              currentPage <= 1 && "pointer-events-none text-muted-foreground"
            )}
          >
            <PaginationPrevious
              size={"icon"}
              className="grid place-items-center p-0"
              isActive={currentPage > 1}
            />
          </Link>
        </PaginationItem>
        {pageNavs[0] !== 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageNavs.map(page => (
          <PaginationItem key={page}>
            <Link
              to={createPageURL(page)}
              className={cn(
                page == currentPage,
                "pointer-events-none text-muted-foreground"
              )}
            >
              <PaginationLink isActive={page !== currentPage}>
                {page}
              </PaginationLink>
            </Link>
          </PaginationItem>
        ))}
        {pageNavs[pageNavs.length - 1] !== totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <Link
            to={createPageURL(currentPage + 1)}
            className={cn(
              currentPage == totalPages &&
                "pointer-events-none text-muted-foreground"
            )}
          >
            <PaginationNext
              size={"icon"}
              className="grid place-items-center p-0"
              isActive={currentPage < totalPages}
            />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default PaginationComponent
