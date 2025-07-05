import { QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { useQuery } from '@tanstack/react-query';
import { findMySelf } from './service';
import { useSetAtom } from 'jotai';
import { isAuthAtom } from 'src/application/stores/auth.store';
import { useEffect } from 'react';

export const useGetMyProfile = () => {
  const setIsAuth = useSetAtom(isAuthAtom);

  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
    refetch: refetchUserInfo,
  } = useQuery({
    queryFn: () => findMySelf(),
    queryKey: [SERVICE_KEYS.user, QUERY_KEYS.me],
  });

  useEffect(() => {
    if (userInfoIsSuccess) {
      setIsAuth(true);
    }
  }, [setIsAuth, userInfoIsSuccess]);

  return { userInfo, userInfoIsLoading, userInfoIsSuccess, refetchUserInfo };
};
