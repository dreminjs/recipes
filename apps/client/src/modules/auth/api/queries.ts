import { IStandardResponse, IAuthResponse } from '@/interfaces*';
import {
  ISignIn,
  ISignUp,
  PAGE_KEYS,
  QUERY_KEYS,
  SERVICE_KEYS,
} from '@/shared*';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { isAuthAtom } from 'src/app/stores/auth.store';
import {
  ApiOperationState,
  IErrorResponse,
} from 'src/shared/model/interfaces/api.interface';
import { SigninWithTwoFaDto } from '../model/types/signin-with-two-fa.dto';
import { signin, signinByTwoFa, signup } from './service';
import { useNotificationStore } from 'src/modules/notifications';

export const useSigninWithTwoFa = () => {
  const { push: navigate } = useRouter();
  const setIsAuth = useSetAtom(isAuthAtom);

  const {
    addErrorNotification,
    addInfoNotification,
    addSuccessNotification,
    removeNotification,
  } = useNotificationStore();

  return useMutation<
    IStandardResponse<IAuthResponse>,
    AxiosError<IErrorResponse>,
    SigninWithTwoFaDto
  >({
    mutationKey: [QUERY_KEYS['2fa']],
    mutationFn: (data: SigninWithTwoFaDto) => signinByTwoFa(data),
    onSuccess: () => {
      removeNotification('info');
      addSuccessNotification({ duration: 3000, message: 'Успех' });
      setIsAuth(true);
      navigate('/');
    },
    onError() {
      removeNotification('info');
      addErrorNotification();
    },
    onMutate: () => {
      addInfoNotification();
    },
  });
};

export const useSignUp = (): {
  mutate: (data: ISignUp) => void;
  data: IStandardResponse | undefined;
} & ApiOperationState => {
  const { push: navigate } = useRouter();

  const setIsAuth = useSetAtom(isAuthAtom);

  return useMutation<IStandardResponse, AxiosError<IErrorResponse>, ISignUp>({
    mutationFn: (data: ISignUp) => signup(data),
    onSuccess: () => {
      navigate(PAGE_KEYS.emailConfirm);
      setIsAuth(true);
    },
  });
};

export const useSignIn = () => {
  const { push: navigate } = useRouter();

  const queryClient = useQueryClient();

  const setIsAuth = useSetAtom(isAuthAtom);

  return useMutation<
    IStandardResponse<IAuthResponse>,
    AxiosError<IErrorResponse>,
    ISignIn
  >({
    mutationFn: (data: ISignIn) => signin(data),
    onSuccess: ({ data }) => {
      if (data?.isTwoFactorEnabled) {
        navigate(`${PAGE_KEYS['signin-with-two-fa']}?email=${data.email}`);
      } else {
        navigate('/');
        setIsAuth(true);
        queryClient.invalidateQueries({
          queryKey: [SERVICE_KEYS.users, QUERY_KEYS.me],
        });
      }
    },
  });
};
