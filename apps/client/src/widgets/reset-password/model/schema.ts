import { z } from 'zod';

export const requestResetPasswordFormSchema = z.object({
  email: z.string().email('Email must be valid'),
});


export const passwordResetFormSchema = z
  .object({
    newPassword: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], // Указываем путь для ошибки
  });
