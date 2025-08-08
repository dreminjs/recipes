import z from "zod";

export const StepFormSchema = z.object({
  content: z
    .string()
    .min(3, 'Минимальная длина 3 символа')
    .max(40, 'Шаг должен быть короче 40 символов'),
})