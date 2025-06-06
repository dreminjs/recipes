import { useForm } from 'react-hook-form';
import { AuthButton, ISignIn, PAGE_KEYS, SignInSchema } from '@/shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '../api/queries';
import { MessageModal } from '@/features/message';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { SigninFormField } from '../model/ui/signin-form-field';
import Link from 'next/link';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: zodResolver(SignInSchema) });

  const { mutate, isError, isPending, isSuccess, error } = useSignIn();

  return (
    <>
      <AuthFormLayout onSubmit={handleSubmit((data) => mutate({ ...data }))}>
        <SigninFormField
          register={register}
          error={errors.email?.message}
          type="email"
        />
        <SigninFormField
          register={register}
          error={errors.password?.message}
          type="password"
        />
        <AuthButton isLoading={isPending} />
        <Link
          className="text-[#d36922] text-center block"
          href={PAGE_KEYS['request-reset-password']}
        >
          Сброс пароля
        </Link>
      </AuthFormLayout>
      <MessageModal
        isError={isError}
        isLoading={isPending}
        isSuccess={isSuccess}
        message={{
          isError: error?.response?.data.message || 'error!',
          isLoading: 'Выполняется вход...',
          isSuccess: 'Вход выполнен успешно!',
        }}
      />
    </>
  );
};
