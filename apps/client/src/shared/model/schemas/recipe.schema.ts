import { z } from 'zod';

export const PostRecipeFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .max(1000, 'Description must be at most 1000 characters long'),
  photo: z.any()
    // .instanceof(File)
    // .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    // .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'File must be a JPEG or PNG image'),
});
