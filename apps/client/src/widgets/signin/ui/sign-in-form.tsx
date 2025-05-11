import { useForm } from 'react-hook-form';
import { AuthButton, ISignIn, SignInSchema } from '@/shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninFormField } from '@/features/auth';
import { usePostSignIn } from '../api/queries';
import { MessageModal } from '@/features/message';
import { AuthFormLayout } from 'src/shared/ui/auth-form-layout';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: zodResolver(SignInSchema) });

  const { signin, signinIsLoading, signinIsSuccess, signinIsError } =
    usePostSignIn();

  return (
    <>
      <AuthFormLayout onSubmit={handleSubmit((data) => signin({ ...data }))}>
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
        <AuthButton isLoading={signinIsLoading} />
      </AuthFormLayout>
      <MessageModal
        isError={signinIsError}
        isLoading={signinIsLoading}
        isSuccess={signinIsSuccess}
        message={{
          isError: 'Проверьте введенные данные',
          isLoading: 'Выполняется вход...',
          isSuccess: 'Вход выполнен успешно!',
        }}
      />
    </>
  );
};
