import { useForm } from 'react-hook-form';
import { FormField, ISignIn, PAGE_KEYS, SignInSchema } from '@/shared/';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import Link from 'next/link';
import { useSignIn } from '../../api/queries';
import { AuthButton } from '../auth-button';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: zodResolver(SignInSchema) });

  const { mutate, isPending } = useSignIn();

  return (
    <>
      <AuthFormLayout onSubmit={handleSubmit((data) => mutate({ ...data }))}>
        <FormField<ISignIn>
          register={register}
          error={errors.email?.message}
          type="email"
          placeholder={'email'}
          className='mb-2'
        />
        <FormField<ISignIn>
          register={register}
          error={errors.password?.message}
          type="password"
          placeholder='пароль'
        />
        <AuthButton isLoading={isPending} />
        <Link
          className="text-[#d36922] text-center block"
          href={PAGE_KEYS['request-reset-password']}
        >
          Сброс пароля
        </Link>
      </AuthFormLayout>
    </>
  );
};
