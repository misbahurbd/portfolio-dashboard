import { z } from "zod"

export const skillFormSchema = z.object({
  label: z.string().min(1, "Label is required"),
  experiencesLevel: z.string().min(1, "Experience level is required"),
  isFeatured: z.boolean(),
})
