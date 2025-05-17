import { useRouter } from 'next/router';
import { signup } from './service';
import { useMutation } from '@tanstack/react-query';
import { ISignUp, PAGE_KEYS } from '@/shared*';

export const useSignUp = () => {
  const { push: navigate } = useRouter();

  const {
    mutate,
    isLoading,
    data: signupData,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn:(data: ISignUp) => signup(data),
    onSuccess: () => {
      navigate(PAGE_KEYS.emailConfirm);
    }
  });

  console.log(signupData);

  return {
    signup: mutate,
    signupIsLoading: isLoading,
    signupData,
    signupIsSuccess: isSuccess,
    signupIsError: isError,
  };
};
