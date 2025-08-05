import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetMyProfile } from '@/modules/user';
import { authProtectedRoutes } from './auth-protected-routes';
import { PAGE_KEYS } from '@/shared';

export const IsAuth: FC<PropsWithChildren> = ({ children }) => {

  const { data } = useGetMyProfile();

  const router = useRouter();

  const isProtectedRoute = authProtectedRoutes.some(el => el === router.pathname)

  useEffect(() => {
    if (isProtectedRoute && !data) {
      router.push("/")
    }
    if (router.pathname.includes(PAGE_KEYS.signin) || router.pathname.includes(PAGE_KEYS.signup) && !data) {
      router.push("/")
    }
  }, [isProtectedRoute, data])

  return <>{children}</>;
};
