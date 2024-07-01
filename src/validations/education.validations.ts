import { z } from "zod"

export const createEducationFormSchema = z.object({
  school: z.string().min(1, "School is required"),
  location: z.string().min(1, "Location is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  description: z.string().min(1, "Description is required"),
})
