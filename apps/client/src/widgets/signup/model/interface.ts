import { z } from 'zod';
import { SignUpSchema } from './schema';

export type ISignUp = z.infer<typeof SignUpSchema>;
