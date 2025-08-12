import { z } from 'zod';
import { IngredientFormSchema } from '../schemas/ingredient.schema';

import { Measure } from '@prisma/client';
export type IPostIngredientForm = z.infer<typeof IngredientFormSchema>;

export interface IOption {
  value: Measure;
  label: 'кг' | 'шт' | 'грамм' | 'милилитр' | 'литр';
}
