import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordInput } from '../model/ui/reset-password-form-field';
import { ResetPasswordFormSchema } from '../model/schema';
import { useRequestResetPassword } from '../model/api/queries';
import { IResetPasswordForm } from '../model/inteface';

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const { sendRequestResetPassword } = useRequestResetPassword();

  return (
    <form
      onSubmit={handleSubmit((data) => sendRequestResetPassword(data))}
      className="space-y-6 w-1/2 mx-auto"
    >
      <ResetPasswordInput error={errors.email?.message} register={register} />
      <button
        type="submit"
        className="w-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        Отправить ссылку для сброса
      </button>
    </form>
  );
};
