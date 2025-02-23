import { z } from 'zod';
import { SignUpSchema,SignInSchema } from '../schemas/auth.schema';

export type ISignUp = z.infer<typeof SignUpSchema>;

export type ISignIn = z.infer<typeof SignInSchema>;