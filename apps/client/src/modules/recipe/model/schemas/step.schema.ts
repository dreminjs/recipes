import z from "zod";

export const StepFormSchema = z.object({
  content: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long'),
})