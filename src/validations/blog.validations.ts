import { z } from "zod"

export const createBlogFormSchema = z.object({
  title: z.string().min(1, "Blog title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Blog content is required"),
  featurePhoto: z.string().min(1, "Feature image is required"),
  category: z.string().min(1, "Blog category is required"),
  metadata: z.object({
    title: z.string().min(1, "SEO title is required"),
    description: z.string().min(1, "SEO description is required"),
    socialImg: z.string().optional(),
  }),
})
