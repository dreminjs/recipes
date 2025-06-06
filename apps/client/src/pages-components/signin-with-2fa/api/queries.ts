import { QUERY_KEYS } from '@/shared*';
import { useMutation } from '@tanstack/react-query';
import {
  ApiOperationState,
  IErrorResponse,
} from 'src/shared/model/interfaces/api.interface';
import { index } from './service';
import { IAuthResponse, IStandardResponse } from '@/interfaces*';
import { AxiosError } from 'axios';
import { SigninWithTwoFaDto } from '../model/types/signin-with-two-fa.dto';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { isAuthAtom } from 'src/application/stores/auth.store';

export const useSigninWithTwoFa = (): {
  mutate: (data: SigninWithTwoFaDto) => void;
} & ApiOperationState => {
  const { push: navigate } = useRouter();
  const setIsAuth = useSetAtom(isAuthAtom);

  const { mutate, isError, isSuccess, isPending, error } = useMutation<
    IStandardResponse<IAuthResponse>,
    AxiosError<IErrorResponse>,
    SigninWithTwoFaDto
  >({
    mutationKey: [QUERY_KEYS['2fa']],
    mutationFn: (data: SigninWithTwoFaDto) => index(data),
    onSuccess: () => {
      setIsAuth(true);
      navigate('/');
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
    error,
  };
};
