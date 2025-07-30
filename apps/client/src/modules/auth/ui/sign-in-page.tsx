import { AuthTitle } from '@/shared*';
import { AuthLayout } from 'src/shared/ui/layouts/auth-layout';
import { SignInForm } from './sign-in-form';

export const SignInPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Вход в аккаунт" />
      <SignInForm />
    </AuthLayout>
  );
};
