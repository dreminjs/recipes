import { useMutation } from '@tanstack/react-query';
import { ISignIn } from '@/shared*';
import { signin } from './service';

export const useSignIn = () => {
  const { mutate, isLoading, data, isSuccess, isError } = useMutation({
    mutationFn: (data: ISignIn) => signin(data),
  });

  return {
    signin: mutate,
    signinIsLoading: isLoading,
    signinData: data,
    signinIsSuccess: isSuccess,
    signinIsError: isError,
  };
};
