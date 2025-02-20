import { useMutation } from '@tanstack/react-query';
import { AuthService } from './auth.service';
import { ISignIn, ISignUp } from '../../../model/interfaces/auth.interface';
import { useRouter } from 'next/router';
import { PAGE_KEYS } from '../../../model/constants';

export const usePostSignUp = () => {
  const { push: navigate } = useRouter();

  const { mutate, isLoading, data, isSuccess, isError } = useMutation({
    mutationFn: (data: ISignUp) => AuthService.signup(data),
    onSuccess: () => {
      navigate(PAGE_KEYS.emailConfirm);
    },
  });

  return {
    signup: mutate,
    signupIsLoading: isLoading,
    signupData: data,
    signupIsSuccess: isSuccess,
    signupIsError: isError,
  };
};

export const usePostSignIn = () => {
  const { push: navigate } = useRouter();

  const { mutate, isLoading, data, isSuccess, isError } = useMutation({
    mutationFn: (data: ISignIn) => AuthService.signin(data),
    onSuccess: (data) => {
      console.log(data);
      if (!data.isActived) {
        navigate(PAGE_KEYS.emailConfirm);
      } else {
        navigate('/');
      }
    },
  });

  return {
    signin: mutate,
    signinIsLoading: isLoading,
    signinData: data,
    signinIsSuccess: isSuccess,
    signinIsError: isError,
  };
};
