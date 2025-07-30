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
import { useNotificationActions } from 'src/modules/notifications';

export const useSigninWithTwoFa = () => {
  const { push: navigate } = useRouter();
  const setIsAuth = useSetAtom(isAuthAtom);

  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  return useMutation<
    IStandardResponse<IAuthResponse>,
    AxiosError<IErrorResponse>,
    SigninWithTwoFaDto
  >({
    mutationKey: [QUERY_KEYS['2fa']],
    mutationFn: (data: SigninWithTwoFaDto) => signinByTwoFa(data),
    onSuccess: () => {
      remove('info');
      addSuccess({ duration: 3000, message: 'Успех' });
      setIsAuth(true);
      navigate('/');
    },
    onError(error) {
      remove('info');
      addError({ message: error.response?.data.message });
    },
    onMutate: () => {
      addInfo();
    },
  });
};

export const useSignUp = () => {
  const { push: navigate } = useRouter();

  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  const setIsAuth = useSetAtom(isAuthAtom);

  return useMutation<IStandardResponse, AxiosError<IErrorResponse>, ISignUp>({
    mutationFn: (data: ISignUp) => signup(data),
    onSuccess: () => {
      remove('info');
      addSuccess();
      navigate(`${SERVICE_KEYS.auth}/${PAGE_KEYS.emailConfirm}`);
      setIsAuth(true);
    },
    onError: (error) => {
      remove('info');
      addError({ message: error.response?.data.message });
    },
    onMutate: () => addInfo(),
  });
};

export const useSignIn = () => {
  const { push: navigate } = useRouter();

  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  const queryClient = useQueryClient();

  const setIsAuth = useSetAtom(isAuthAtom);

  return useMutation<IStandardResponse, AxiosError<IErrorResponse>, ISignIn>({
    mutationFn: (data: ISignIn) => signin(data),
    onSuccess: ({ data }) => {
      remove('info')
      addSuccess();
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
    onError: (error) => {
      remove('info')

      addError({ message: error.response?.data.message });
    },
    onMutate: () => addInfo(),
  });
};
