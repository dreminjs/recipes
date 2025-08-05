import { AuthTitle, AuthLayout } from '@/shared';
import { SignInForm } from './sign-in-form';

export const SignInPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Вход в аккаунт" />
      <SignInForm />
    </AuthLayout>
  );
};
