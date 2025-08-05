import { AuthTitle } from '@/shared';
import { AuthLayout } from 'src/shared/ui/layouts/auth-layout';
import { SignUpForm } from './sign-up-form';
export const SignUpPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Регистрация" />
      <SignUpForm />
    </AuthLayout>
  );
};
