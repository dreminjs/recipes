import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { passwordResetFormSchema } from '../model/schema';
import { IResetPasswordForm } from '../model/inteface';
import { ResetPasswordInput } from '../model/ui/reset-password-form-field';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { AuthButton } from '@/shared*';
import { useResetPassword } from '../model/api/queries';
import { NextRouter, useRouter } from 'next/router';
import { MessageModal } from '@/featuresmessage';

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
    resetPasswordData,
    resetPasswordError,
    resetPasswordIsError,
    resetPasswordIsSuccess,
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
      <MessageModal
        message={{
          isSuccess: resetPasswordData?.message || 'успех!',
          isError: resetPasswordError?.message || 'ошибка :(',
          isLoading: resetPasswordData?.message || 'загрузка...',
        }}
        isLoading={resetPasswordIsLoading}
        isError={resetPasswordIsError}
        isSuccess={resetPasswordIsSuccess}
      />
    </>
  );
};
