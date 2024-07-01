import { z } from "zod"

export const createProjectFormSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  challenges: z.string().min(1, "Project challenges is required"),
  solutions: z.string().min(1, "Project solutions is required"),
  featurePhoto: z.string().min(1, "Feature image is required"),
  photos: z.array(z.string()).min(1, "Project photos is required"),
  skills: z.array(z.string()).min(1, "Project skills is required"),
  sourceLinks: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        link: z.string().min(1, "Link is required").url("Invalid url"),
      })
    )
    .min(1, "Source link required"),
  metadata: z.object({
    title: z.string().min(1, "SEO title is required"),
    description: z.string().min(1, "SEO description is required"),
    socialImg: z.string().optional(),
  }),
})
