import { PAGE_KEYS, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { useMutation, useQuery } from '@tanstack/react-query';
import { findMySelf, requestResetPassword, resendEmailConfirmation, resetPassword, sendDisableTwoFaRequest, sendEnableTwoFaRequest } from './service';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { isAuthAtom } from 'src/app/stores/auth.store';
import { IRequestResetPasswordForm, IResetPasswordDto } from '../modal/interface';
import { IStandardResponse } from '@/interfaces*';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export const useGetMyProfile = () => {
  const setIsAuth = useSetAtom(isAuthAtom);

  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
    refetch: refetchUserInfo,
  } = useQuery({
    queryFn: () => findMySelf(),
    queryKey: [SERVICE_KEYS.user, QUERY_KEYS.me],
  });

  useEffect(() => {
    if (userInfoIsSuccess) {
      setIsAuth(true);
    }
  }, [setIsAuth, userInfoIsSuccess]);

  return { userInfo, userInfoIsLoading, userInfoIsSuccess, refetchUserInfo };
};


export const useResendEmailConfirmation = () => useMutation({
  mutationKey: [SERVICE_KEYS.mail,QUERY_KEYS.resend],
  mutationFn: () => resendEmailConfirmation()
})


export const useSendEnableTwoFaRequest = () => useMutation({
  mutationFn: () => sendEnableTwoFaRequest(),
  mutationKey: [SERVICE_KEYS.auth,QUERY_KEYS['2fa']]
})

export const useSendDisableTwoFaRequest = () => useMutation({
  mutationFn: () => sendDisableTwoFaRequest(),
  mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['2fa']]
})



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
