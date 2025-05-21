import { AuthTitle } from '@/shared*';
import { SignInForm } from '@/widgetsauth/ui/sign-in-form';
import { AuthLayout } from 'src/shared/ui/layouts/auth-layout';

export const SignInPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Вход в аккаунт" />
      <SignInForm />
    </AuthLayout>
  );
};
