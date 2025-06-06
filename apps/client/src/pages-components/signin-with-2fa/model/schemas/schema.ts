import { z } from 'zod';

export const signinTwoFaSchema = z.object({
  secret: z.string().min(1, 'Поле обязательно'),
});
