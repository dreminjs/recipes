import { QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { useMutation } from '@tanstack/react-query';
import { logout } from './service';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { isAuthAtom } from 'src/application/stores/auth.store';

export const useLougout = () => {
  const { push: navigate } = useRouter();
  const setIsAuth = useSetAtom(isAuthAtom);

  const {
    mutate: logoutFromAccount,
    isSuccess: isSuccesslogoutFromAccount,
    isError: isErrorlogoutFromAccount,
    isPending: isLoadinglogoutFromAccount,
  } = useMutation({
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS.signout],
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate('/');
      setIsAuth(false);
    },
  });

  return {
    logoutFromAccount,
    isSuccesslogoutFromAccount,
    isErrorlogoutFromAccount,
    isLoadinglogoutFromAccount,
  };
};
