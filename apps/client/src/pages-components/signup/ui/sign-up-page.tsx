import { AuthTitle } from '@/shared*';
import { SignUpForm } from '@/widgetsauth';
import { AuthLayout } from 'src/shared/ui/layouts/auth-layout';
export const SignUpPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Регистрация" />
      <SignUpForm />
    </AuthLayout>
  );
};
