import { AuthTitle } from '@/shared*';
import { SignInForm } from '@/widgets/signin';
import { AuthLayout } from 'src/shared/ui/layouts/auth-layout';

export const SignInPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Вход в аккаунт" />
      <SignInForm />
    </AuthLayout>
  );
};
