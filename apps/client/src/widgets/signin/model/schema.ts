import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email("Email must be valid"),
    password: z.string().min(6,"Password must be at least 6 characters long").max(100,"Password must be at most 100 characters long"),
});