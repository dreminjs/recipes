import { z } from "zod";
import { passwordResetFormSchema, requestResetPasswordFormSchema, UserSchema } from "./schema";

export type IUserForm = z.infer<typeof UserSchema>;

export type IRequestResetPasswordForm = z.infer<
  typeof requestResetPasswordFormSchema
>;

export type IResetPasswordForm = z.infer<typeof passwordResetFormSchema>;

export type IResetPasswordDto = { token?: string } & Omit<
  IResetPasswordForm,
  'confirmPassword'
>;
