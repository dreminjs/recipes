import { RequestResetPasswordForm } from '@/widgetsreset-password/ui/request-reset-password-form';

export const RequestResetPasswordPage = () => {
  return (
    <>
      <div className="w-1/2 mx-auto">
        <h3 className="text-2xl text-left text-amber-500">Сброс пароля</h3>
        <RequestResetPasswordForm />
      </div>
    </>
  );
};
