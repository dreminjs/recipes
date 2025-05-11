import { useForm } from 'react-hook-form';
import { AuthButton, ISignUp, SignUpSchema } from '@/shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormField } from '@/features/auth';
import { usePostSignUp } from '../api/queries';
import { MessageModal } from '@/features/message';
import { AuthFormLayout } from 'src/shared/ui/auth-form-layout';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: zodResolver(SignUpSchema) });

  const { signup, signupIsLoading, signupIsSuccess, signupIsError } =
    usePostSignUp();

  return (
    <>
      <AuthFormLayout onSubmit={handleSubmit((data) => signup({ ...data }))}>
        <SignupFormField
          register={register}
          error={errors.email?.message}
          type="email"
        />

        <SignupFormField
          register={register}
          error={errors.nickname?.message}
          type="nickname"
        />

        <SignupFormField
          register={register}
          error={errors.password?.message}
          type="password"
        />

        <AuthButton isLoading={signupIsLoading} />
      </AuthFormLayout>

      <MessageModal
        isError={signupIsError}
        isLoading={signupIsLoading}
        isSuccess={signupIsSuccess}
        message={{
          isError: 'Проверьте введенные данные',
          isLoading: 'Регистрация...',
          isSuccess: 'Регистрация успешно завершена!',
        }}
      />
    </>
  );
};
