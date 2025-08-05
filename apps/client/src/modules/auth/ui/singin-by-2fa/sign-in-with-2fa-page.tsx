import { AuthTitle } from '@/shared';
import { AuthLayout } from 'src/shared/ui/layouts/auth-layout';
import { SigninFormWithTwoFa } from './sign-in-form-with-2fa';

export const SignInWithTwoFaPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Вход по коду" />
      <SigninFormWithTwoFa />
    </AuthLayout>
  );
};
