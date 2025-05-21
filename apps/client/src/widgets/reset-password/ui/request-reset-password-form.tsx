import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RequestResetPasswordInput } from '../model/ui/request-reset-password-form-field';
import { requestResetPasswordFormSchema } from '../model/schema';
import { useRequestResetPassword } from '../model/api/queries';
import { IRequestResetPasswordForm } from '../model/inteface';
import { MessageModal } from '@/featuresmessage';

export const RequestResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestResetPasswordForm>({
    resolver: zodResolver(requestResetPasswordFormSchema),
  });

  const {
    sendRequestResetPassword,
    requestResetPasswordIsSuccess,
    requestResetPasswordIsLoading,
    requestResetPasswordIsError,
    requestResetPasswordData,
    requestResetPasswordError,
  } = useRequestResetPassword();

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => sendRequestResetPassword(data))}
        className="space-y-6"
      >
        <RequestResetPasswordInput
          error={errors.email?.message}
          register={register}
        />
        <button
          type="submit"
          className="w-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Отправить ссылку для сброса
        </button>
      </form>
      <MessageModal
        message={{
          isSuccess: requestResetPasswordData?.message || 'успех!',
          isError: requestResetPasswordError?.message || 'ошибка :(',
          isLoading: requestResetPasswordData?.message || 'загрузка...',
        }}
        isLoading={requestResetPasswordIsLoading}
        isError={requestResetPasswordIsError}
        isSuccess={requestResetPasswordIsSuccess}
      />
    </>
  );
};
