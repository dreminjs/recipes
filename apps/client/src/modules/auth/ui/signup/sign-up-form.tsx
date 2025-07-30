import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { AuthButton, FormField, ISignUp, SignUpSchema } from '@/shared*';
import { useSignUp } from '../../api/queries';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: zodResolver(SignUpSchema) });

  const { mutate, isPending } = useSignUp();

  return (
    <>
      <AuthFormLayout onSubmit={handleSubmit((data) => mutate({ ...data }))}>
        <FormField<ISignUp>
          register={register}
          error={errors.email?.message}
          type="email"
          placeholder="email"
        />

        <FormField<ISignUp>
          register={register}
          error={errors.nickname?.message}
          type="nickname"
          placeholder={'Имя пользователя'}
        />

        <FormField<ISignUp>
          register={register}
          error={errors.password?.message}
          type="password"
          placeholder={'password'}
        />
        <AuthButton isLoading={isPending} />
      </AuthFormLayout>
    </>
  );
};
