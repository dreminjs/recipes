import { QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { useMutation } from '@tanstack/react-query';
import { logout } from './service';

export const useLougout = () => {
  const {
    mutate: logoutFromAccount,
    isSuccess: isSuccesslogoutFromAccount,
    isError: isErrorlogoutFromAccount,
    isLoading: isLoadinglogoutFromAccount,
  } = useMutation({
    mutationKey: [QUERY_KEYS.auth, SERVICE_KEYS.signout],
    mutationFn: () => logout(),
  });

  return {
    logoutFromAccount,
    isSuccesslogoutFromAccount,
    isErrorlogoutFromAccount,
    isLoadinglogoutFromAccount
  };
};
