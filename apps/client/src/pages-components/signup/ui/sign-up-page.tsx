import { AuthTitle } from '@/shared*';
import { SignUpForm } from '@/widgets/signup';
import { AuthLayout } from 'src/shared/ui/layouts/auth-layout';
export const SignUpPage = () => {
  return (
    <AuthLayout>
      <AuthTitle content="Регистрацияы" />
      <SignUpForm />
    </AuthLayout>
  );
};
