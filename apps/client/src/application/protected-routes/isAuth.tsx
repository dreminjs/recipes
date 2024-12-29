import { FC, PropsWithChildren, useEffect } from 'react';
import { useGetMyProfile } from '../../shared';
import { useRouter } from 'next/router';

export const IsAuth: FC<PropsWithChildren> = ({ children }) => {
  const { userInfo, userInfoIsLoading, userInfoIsSuccess } = useGetMyProfile();

  const navigate = useRouter();

  useEffect(() => {
    if (userInfoIsSuccess && !userInfo) {
      navigate.push('/');
    }
  }, [navigate, userInfo, userInfoIsLoading, userInfoIsSuccess]);

  if (userInfoIsLoading) return;

  return <>{children}</>;
};
