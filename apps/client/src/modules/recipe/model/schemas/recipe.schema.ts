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
   photos: z
    .array(z.any())
    .nonempty("Please add at least one photo.")
    .max(5, "You can add up to 5 photos.")
    .refine(
      (files) => files.every((file: File) => file.size <= 5 * 1024 * 1024),
      "Each file must be less than 5MB."
    )
    .refine(
      (files) => files.every((file: File) => file.type.match(/image\/(jpeg|png|jpg)/)),
      "Only JPEG and PNG images are allowed."
    ),
});
