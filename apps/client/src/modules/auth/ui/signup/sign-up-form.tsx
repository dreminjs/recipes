import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { FormField, ISignUp, SignUpSchema } from '@/shared';
import { useSignUp } from '../../api/queries';
import { AuthButton } from '../auth-button';

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
          className='mb-2'
        />

        <FormField<ISignUp>
          register={register}
          error={errors.nickname?.message}
          type="nickname"
          placeholder={'Имя пользователя'}
          className='mb-2'
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
