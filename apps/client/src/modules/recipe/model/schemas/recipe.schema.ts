import { z } from 'zod';

export const PostRecipeFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(100, 'Название не должно превышать 100 символов'),

  description: z
    .string()
    .min(3, 'Описание должно содержать минимум 3 символа')
    .max(1000, 'Описание не должно превышать 1000 символов'),

  photos: z
    .array(z.any())
    .nonempty('Пожалуйста, добавьте хотя бы одно фото')
    .max(5, 'Можно добавить не более 5 фотографий')
    .refine(
      (files) => files.every((file: File) => file.size <= 5 * 1024 * 1024),
      'Каждый файл должен быть меньше 5MB'
    )
    .refine(
      (files) =>
        files.every((file: File) => file.type.match(/image\/(jpeg|png|jpg)/)),
      'Допускаются только изображения в формате JPEG или PNG'
    ),
});
