import { z } from 'zod';

export const PostCharacteristicFormSchema = z.object({
  title: z
    .string()
    .min(3, 'заголовок должен быть длинее 3 символов')
    .max(100, 'заголовок должен быть короче 100 символов'),
});
