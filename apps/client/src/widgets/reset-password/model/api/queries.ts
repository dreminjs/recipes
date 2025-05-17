import { QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { useMutation } from '@tanstack/react-query';
import { requestResetPassword } from './service';
import { IResetPasswordForm } from '../inteface';

export const useRequestResetPassword = () => {
  const {
    mutate: sendRequestResetPassword,
    isSuccess: requestReseetPasswordIsSuccess,
    isLoading: requestReseetPasswordIsLoading,
  } = useMutation({
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['request-reset-password']],
    mutationFn: (data: IResetPasswordForm) => requestResetPassword(data),
  });

  return {
    sendRequestResetPassword,
    requestReseetPasswordIsSuccess,
    requestReseetPasswordIsLoading,
  };
};
