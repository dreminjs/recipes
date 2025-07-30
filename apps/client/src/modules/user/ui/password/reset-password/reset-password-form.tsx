import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { AuthButton, FormField } from '@/shared*';
import { NextRouter, useRouter } from 'next/router';
import { ResetPasswordInput } from './reset-password-form-field';
import { passwordResetFormSchema } from 'src/modules/user/modal/schema';
import { IResetPasswordForm } from 'src/modules/user/modal/interface';
import { useResetPassword } from 'src/modules/user/api/queries';

export const ResetPasswordForm = () => {
  const { query } = useRouter() as NextRouter & { query: { token?: string } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordForm>({
    resolver: zodResolver(passwordResetFormSchema),
  });

  const { sendResetPassword, resetPasswordIsLoading } = useResetPassword();

  return (
    <>
      <AuthFormLayout
        className="mx-auto"
        onSubmit={handleSubmit(({ newPassword }) =>
          sendResetPassword({ newPassword, token: query.token })
        )}
      >
        <FormField<IResetPasswordForm>
          error={errors.newPassword?.message}
          register={register}
          label={'введи новый пароль'}
          type={'newPassword'}
          placeholder={'Новый парольы'}
        />
        <FormField<IResetPasswordForm>
          error={errors.newPassword?.message}
          register={register}
          label={'подтверди его'}
          type={'confirmPassword'}
          placeholder={'повтори'}
          inputType={'number'}
        />
        <AuthButton isLoading={resetPasswordIsLoading} />
      </AuthFormLayout>
    </>
  );
};
