import { useRouter } from 'next/router';
import { signin, signup } from './service';
import { useMutation } from '@tanstack/react-query';
import { ISignIn, ISignUp, PAGE_KEYS } from '@/shared*';
import { useSetAtom } from 'jotai';
import { isAuthAtom } from 'src/application/stores/auth.store';

export const useSignUp = () => {
  const { push: navigate } = useRouter();

  const setIsAuth = useSetAtom(isAuthAtom);

  const {
    mutate,
    isPaused,
    data: signupData,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: ISignUp) => signup(data),
    onSuccess: () => {
      navigate(PAGE_KEYS.emailConfirm);
      setIsAuth(true);
    },
  });

  return {
    signup: mutate,
    signupIsLoading: isPaused,
    signupData,
    signupIsSuccess: isSuccess,
    signupIsError: isError,
    signupError: error,
  };
};

export const useSignIn = () => {
  const { push: navigate } = useRouter();

  const setIsAuth = useSetAtom(isAuthAtom);

  const { mutate, isPending, data, isSuccess, isError, error } = useMutation({
    mutationFn: (data: ISignIn) => signin(data),
    onSuccess: () => {
      navigate(PAGE_KEYS.main);
      setIsAuth(true);
    },
  });

  return {
    signin: mutate,
    signinIsLoading: isPending,
    signinData: data,
    signinIsSuccess: isSuccess,
    signinIsError: isError,
    signinError: error,
  };
};
