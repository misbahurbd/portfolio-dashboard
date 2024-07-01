import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getQueryParams = (query: { [k: string]: string }) => {
  const params = new URLSearchParams()
  if (query.search) {
    params.append("search", query.search)
  }
  if (query.category?.length >= 0) {
    params.append("category", query.category)
  }
  if (query.page) {
    params.append("page", query.page)
  }
  if (query.limit) {
    params.append("limit", query.limit)
  }

  return params
}
