import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import {
  IErrorResponse,
} from 'src/shared/model/interfaces/api.interface';
import { SigninWithTwoFaDto } from '../model/types/signin-with-two-fa.dto';
import { signin, signinByTwoFa, signup } from './service';
import { useNotificationActions } from 'src/modules/notifications';
import { IAuthResponse, IStandardResponse } from 'interfaces';
import { QUERY_KEYS, ISignUp, SERVICE_KEYS, PAGE_KEYS, ISignIn } from '@/shared';

export const useSigninWithTwoFa = () => {
  const { push: navigate } = useRouter();

  const { remove, addSuccess, addError, addInfo } = useNotificationActions();

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({
        queryKey: [SERVICE_KEYS.users, QUERY_KEYS.me],
      });
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

  return useMutation<IStandardResponse, AxiosError<IErrorResponse>, ISignUp>({
    mutationFn: (data: ISignUp) => signup(data),
    onSuccess: () => {
      remove('info');
      addSuccess();
      navigate(`/${SERVICE_KEYS.auth}/${PAGE_KEYS.emailConfirm}`);
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

  return useMutation<IStandardResponse, AxiosError<IErrorResponse>, ISignIn>({
    mutationFn: (data: ISignIn) => signin(data),
    onSuccess: ({ data }) => {
      remove('info')
      addSuccess();
      if (data?.isTwoFactorEnabled) {
        navigate(`${PAGE_KEYS['signin-with-two-fa']}?email=${data.email}`);
      } else {
        window.location.reload()
      }
    },
    onError: (error) => {
      remove('info')
      addError({ message: error.response?.data.message });
    },
    onMutate: () => addInfo(),
  })
};
