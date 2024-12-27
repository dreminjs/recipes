import { useForm } from 'react-hook-form';
import { AuthButton, ISignIn, SignInSchema } from '../../../shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninFormField } from '../../../features/auth';
import { usePostSignIn } from '../../../shared/api/queries/auth.queries';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: zodResolver(SignInSchema) });

  const { signin } = usePostSignIn();

  return (
    <form
      className="max-w-[400px]"
      onSubmit={handleSubmit((data) => signin({ ...data }))}
    >
      <SigninFormField
        register={register}
        error={errors.email?.message}
        type={'email'}
      />

      <SigninFormField
        register={register}
        error={errors.password?.message}
        type={'password'}
      />
      <AuthButton className="text-[24px] rounded-xl px-5 py-2 text-[white] border-2 border-[white]" />
    </form>
  );
};
