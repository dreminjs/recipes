import { useForm } from 'react-hook-form';
import { AuthButton, ISignIn, SignInSchema } from '@/shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninFormField } from '../model/ui/signin-form-field';
import { useSignIn } from '../api/queries';
import { MessageModal } from '@/features/message';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { ResetPassordButton } from '../model/ui/reset-password-button';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: zodResolver(SignInSchema) });

  const { signin, signinIsLoading, signinIsSuccess, signinIsError } =
    useSignIn();

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
        <ResetPassordButton />
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
