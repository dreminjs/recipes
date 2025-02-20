import { useForm } from 'react-hook-form';
import { AuthButton, ISignUp, SignUpSchema } from '../../../shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormField } from '@/features/auth';
import { usePostSignUp } from '@/shared/api/queries/auth.queries';
import { MessageModal } from '@/features/message';


export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: zodResolver(SignUpSchema) });

  const {
    signup,
    signupIsLoading,
    signupIsSuccess,
    signupIsError,
  } = usePostSignUp();

  return (
    <>
      <form
        className="max-w-[400px]"
        onSubmit={handleSubmit((data) => signup({ ...data }))}
      >
        <SignupFormField
          register={register}
          error={errors.email?.message}
          type={'email'}
        />
        <SignupFormField
          register={register}
          error={errors.nickname?.message}
          type={'nickname'}
        />
        <SignupFormField
          register={register}
          error={errors.password?.message}
          type={'password'}
          className="mb-5"
        />
        <AuthButton className="" />
      </form>
      <MessageModal
        isError={signupIsError}
        isLoading={signupIsLoading}
        isSuccess={signupIsSuccess}
        message={{
          isError: "Проверьте данные которые вы ввели",
          isLoading: "Загрузка...",
          isSuccess: "Вы успешно зарегистрировались",
        }}    
         />
    </>
  );
};
