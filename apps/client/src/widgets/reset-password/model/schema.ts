import { z } from "zod";




export const ResetPasswordFormSchema = z.object({
    email: z.string().email("Email must be valid"),
})