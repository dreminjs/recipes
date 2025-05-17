import { z } from "zod";
import { ResetPasswordFormSchema } from "./schema";



export type IResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>