import { Measure } from '@prisma/client';
import { z } from 'zod';

export const IngredientFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long'),
  measure: z.nativeEnum(Measure),
});
