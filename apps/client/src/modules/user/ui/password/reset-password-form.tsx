import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordInput } from './reset-password-form-field';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { AuthButton } from '@/shared*';
import { NextRouter, useRouter } from 'next/router';
import { passwordResetFormSchema } from '../../modal/schema';
import { IResetPasswordForm } from '../../modal/interface';
import { useResetPassword } from '../../api/queries';

export const ResetPasswordForm = () => {
  const { query } = useRouter() as NextRouter & { query: { token?: string } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordForm>({
    resolver: zodResolver(passwordResetFormSchema),
  });

  const {
    sendResetPassword,
    resetPasswordIsLoading,
  } = useResetPassword();

  return (
    <>
      <AuthFormLayout
        className="mx-auto"
        onSubmit={handleSubmit(({ newPassword }) =>
          sendResetPassword({ newPassword, token: query.token })
        )}
      >
        <ResetPasswordInput
          error={errors.newPassword?.message}
          register={register}
          label={'введи новый пароль'}
          type={'newPassword'}
        />
        <ResetPasswordInput
          error={errors.newPassword?.message}
          register={register}
          label={'подтверди его'}
          type={'confirmPassword'}
        />
        <AuthButton isLoading={resetPasswordIsLoading} />
      </AuthFormLayout>
    </>
  );
};
