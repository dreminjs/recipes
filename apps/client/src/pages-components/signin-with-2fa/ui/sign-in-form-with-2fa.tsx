import { useForm } from 'react-hook-form';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { SigninWithTwoFaDto } from '../model/types/signin-with-two-fa.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinTwoFaSchema } from '../model/schemas/schema';
import { useSigninWithTwoFa } from '../api/queries';
import { NextRouter, useRouter } from 'next/router';
import { GradientButton } from '@/shared*';
import { MessageModal } from '@/featuresmessage';

export const SigninFormWithTwoFa = () => {
  const {
    query: { email },
  } = useRouter() as NextRouter & { query: { email: string } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<SigninWithTwoFaDto, 'email'>>({
    resolver: zodResolver(signinTwoFaSchema),
  });

  const { mutate, isError, isPending, isSuccess, error } = useSigninWithTwoFa();

  return (
    <>
      <AuthFormLayout
        onSubmit={handleSubmit((data) => mutate({ ...data, email }))}
      >
        <fieldset className={`mb-4`}>
          <input
            {...register('secret')}
            className={`w-full px-4 py-3 text-lg bg-white/90 rounded-lg border ${
              errors.secret?.message ? 'border-red-500' : 'border-amber-200'
            } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
          />
          {errors.secret?.message && (
            <p className="mt-1 text-red-600 text-sm font-medium animate-fadeIn">
              {errors.secret?.message.toString()}
            </p>
          )}
        </fieldset>
        <GradientButton type='submit'>Вход</GradientButton>
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
