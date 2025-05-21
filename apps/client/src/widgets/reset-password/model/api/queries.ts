import { PAGE_KEYS, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { useMutation } from '@tanstack/react-query';
import { requestResetPassword, resetPassword } from './service';
import { IRequestResetPasswordForm, IResetPasswordDto } from '../inteface';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { IStandardResponse } from '@/interfaces*';

export const useRequestResetPassword = () => {
  const { push: navigate } = useRouter();

  const {
    mutate: sendRequestResetPassword,
    isSuccess: requestResetPasswordIsSuccess,
    isPending:  requestResetPasswordIsLoading,
    isError: requestResetPasswordIsError,
    data: requestResetPasswordData ,
    error: requestResetPasswordError
  } = useMutation({
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['request-reset-password']],
    mutationFn: (data: IRequestResetPasswordForm) => {
      return requestResetPassword(data)
    },
    onSuccess: () => {
      navigate(PAGE_KEYS['password-pending-confirmation']);
    },  
  });

  const errorAxios = requestResetPasswordError as AxiosError<IStandardResponse>

  return {
    sendRequestResetPassword,
    requestResetPasswordIsSuccess,
    requestResetPasswordIsLoading,
    requestResetPasswordIsError,
    requestResetPasswordError: errorAxios?.response?.data,
    requestResetPasswordData
  };
};

export const useResetPassword = () => {
  const { push: navigate } = useRouter();

  const {
    mutate: sendResetPassword,
    isSuccess: resetPasswordIsSuccess,
    isPending:  resetPasswordIsLoading,
    isError: resetPasswordIsError,
    data: resetPasswordData ,
    error: resetPasswordError
  } = useMutation({
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['request-reset-password']],
    mutationFn: (data: IResetPasswordDto) => {
      return resetPassword(data)
    },
    onSuccess: () => {
      navigate(PAGE_KEYS["main"]);
    },  
  });

  const errorAxios = resetPasswordError as AxiosError<IStandardResponse>

  return {
    resetPasswordData,
    resetPasswordIsError,
    resetPasswordIsLoading,
    resetPasswordIsSuccess,
    sendResetPassword,
    resetPasswordError: errorAxios
  };
};
