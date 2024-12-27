import { useForm } from 'react-hook-form';
import { AuthButton, ISignUp, SignUpSchema } from '../../../shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormField } from '../../../features/auth';
import { usePostSignUp } from '../../../shared/api/queries/auth.queries';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: zodResolver(SignUpSchema) });

  const { signup } = usePostSignUp();

  return (
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
      />
      <AuthButton className="text-[24px] rounded-xl px-5 py-2 text-[white] border-2 border-[white]" />
    </form>
  );
};
