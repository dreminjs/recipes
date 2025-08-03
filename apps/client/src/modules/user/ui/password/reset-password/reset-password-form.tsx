import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthButton, FormField, AuthFormLayout } from '@/shared';
import { NextRouter, useRouter } from 'next/router';
import { passwordResetFormSchema } from 'src/modules/user/modal/schema';
import { useResetPassword } from 'src/modules/user/api/queries';
import { IResetPasswordForm } from '@/modules/user/modal/interface';

export const ResetPasswordForm = () => {
  const { query } = useRouter() as NextRouter & { query: { token?: string } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordForm>({
    resolver: zodResolver(passwordResetFormSchema),
  });

  const { mutate, isPending } = useResetPassword();

  return (
    <>
      <AuthFormLayout
        className="mx-auto"
        onSubmit={handleSubmit(({ newPassword }) =>
          mutate({ newPassword, token: query.token })
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
        <AuthButton isLoading={isPending} />
      </AuthFormLayout>
    </>
  );
};
