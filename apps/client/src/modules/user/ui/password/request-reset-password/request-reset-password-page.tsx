import { RequestResetPasswordForm } from "./request-reset-password-form";

export const RequestResetPasswordPage = () => {
  return (
    <>
      <div className="">
        <h3 className="text-2xl text-left text-amber-500">Сброс пароля</h3>
        <RequestResetPasswordForm />
      </div>
    </>
  );
};
