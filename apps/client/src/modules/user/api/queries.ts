import { PAGE_KEYS, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  findMySelf,
  requestResetPassword,
  resendEmailConfirmation,
  resetPassword,
  sendDisableTwoFaRequest,
  sendEnableTwoFaRequest,
} from './service';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { isAuthAtom } from 'src/app/stores/auth.store';
import {
  IRequestResetPasswordForm,
  IResetPasswordDto,
} from '../modal/interface';
import { IStandardResponse } from '@/interfaces*';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useNotificationActions } from 'src/modules/notifications';
import { IErrorResponse } from 'src/shared/model/interfaces/api.interface';

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

export const useResendEmailConfirmation = () => {
  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  return useMutation({
    mutationKey: [SERVICE_KEYS.mail, QUERY_KEYS.resend],
    mutationFn: () => resendEmailConfirmation(),
    onMutate: () => addInfo(),
    onError: () => {
      remove('info');
      addError();
    },
    onSuccess: () => {
      remove('info');
      addSuccess();
    },
  });
};

export const useSendEnableTwoFaRequest = () => {
  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sendEnableTwoFaRequest(),
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['2fa']],
    onMutate: () => addInfo(),
    onError: () => {
      remove('info');
      addError();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SERVICE_KEYS.user, QUERY_KEYS.me],
      });
      remove('info');
      addSuccess();
    },
  });
};

export const useSendDisableTwoFaRequest = () => {
  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sendDisableTwoFaRequest(),
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['2fa']],
    onMutate: () => addInfo(),
    onError: () => {
      remove('info');
      addError();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SERVICE_KEYS.user, QUERY_KEYS.me],
      });
      remove('info');
      addSuccess();
    },
  });
};

export const useRequestResetPassword = () => {
  const { push: navigate } = useRouter();
  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  return useMutation({
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['request-reset-password']],
    mutationFn: (data: IRequestResetPasswordForm) => {
      return requestResetPassword(data);
    },
    onMutate: () => addInfo(),
    onError: () => {
      remove('info');
      addError();
    },
    onSuccess: () => {
      remove('info');
      addSuccess();
      navigate(PAGE_KEYS['password-pending-confirmation']);
    },
  });
};

export const useResetPassword = () => {
  const { push: navigate } = useRouter();

  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  return useMutation<
    IStandardResponse,
    AxiosError<IErrorResponse>,
    IResetPasswordDto
  >({
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS['request-reset-password']],
    mutationFn: (data: IResetPasswordDto) => {
      return resetPassword(data);
    },
    onSuccess: () => {
      remove('info');
      addSuccess();
      navigate(PAGE_KEYS['main']);
    },
    onMutate: () => addInfo(),
    onError: () => {
      remove('info');
      addError();
    },
  });
};
