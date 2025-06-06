import { z } from 'zod';
import { signinTwoFaSchema } from '../schemas/schema';

export type SigninWithTwoFaDto = z.infer<typeof signinTwoFaSchema> & {
  email: string;
};
