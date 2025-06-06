import { useRouter } from 'next/router';
import { signin, signup } from './service';
import { useMutation } from '@tanstack/react-query';
import { ISignIn, ISignUp, PAGE_KEYS } from '@/shared*';
import { useSetAtom } from 'jotai';
import { isAuthAtom } from 'src/application/stores/auth.store';
import {
  ApiOperationState,
  IErrorResponse,
} from 'src/shared/model/interfaces/api.interface';
import { IAuthResponse, IStandardResponse } from '@/interfaces*';
import { AxiosError } from 'axios';

export const useSignUp = (): {
  mutate: (data: ISignUp) => void;
  data: IStandardResponse | undefined;
} & ApiOperationState => {
  const { push: navigate } = useRouter();

  const setIsAuth = useSetAtom(isAuthAtom);

  const { mutate, isPending, data, isSuccess, isError, error } = useMutation<
    IStandardResponse,
    AxiosError<IErrorResponse>,
    ISignUp
  >({
    mutationFn: (data: ISignUp) => signup(data),
    onSuccess: () => {
      navigate(PAGE_KEYS.emailConfirm);
      setIsAuth(true);
    },
  });

  return {
    mutate,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  };
};

export const useSignIn = (): {
  mutate: (data: ISignIn) => void;
  data: IStandardResponse<IAuthResponse> | undefined;
} & ApiOperationState => {
  const { push: navigate } = useRouter();

  const setIsAuth = useSetAtom(isAuthAtom);

  const { mutate, isPending, data, isSuccess, isError, error } = useMutation<
    IStandardResponse<IAuthResponse>,
    AxiosError<IErrorResponse>,
    ISignIn
  >({
    mutationFn: (data: ISignIn) => signin(data),
    onSuccess: ({ data }) => {
      if (data?.isTwoFactorEnabled) {
        navigate(`${PAGE_KEYS['signin-with-two-fa']}?email=${data.email}`);
      }else {
        navigate('/')
        setIsAuth(true)
      }
    },
  });

  return {
    mutate,
    isPending,
    data: data,
    isSuccess: isSuccess,
    isError: isError,
    error: error,
  };
};
