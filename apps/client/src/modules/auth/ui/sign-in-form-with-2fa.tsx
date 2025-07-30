import {
  useForm,
} from 'react-hook-form';
import { AuthFormLayout } from 'src/shared/ui/layouts/auth-form-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinTwoFaSchema } from '../model/schemas/schema';
import { NextRouter, useRouter } from 'next/router';
import { GradientButton } from '@/shared*';
import { SigninWithTwoFaDto } from '../model/types/signin-with-two-fa.dto';
import { useSigninWithTwoFa } from '../api/queries';
import { FormField } from './form-field';

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

  const { mutate } = useSigninWithTwoFa();

  return (
    <>
      <AuthFormLayout
        onSubmit={handleSubmit((data) => mutate({ ...data, email }))}
      >
        <FormField
          register={register}
          error={errors.root?.message}
          type={'secret'}
          placeholder={'Секрет-код'}
        />
        <GradientButton type="submit">Вход</GradientButton>
      </AuthFormLayout>
    </>
  );
};
