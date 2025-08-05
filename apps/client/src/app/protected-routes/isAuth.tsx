import { FC, PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useGetMyProfile } from '@/modules/user';

export const IsAuth: FC<PropsWithChildren> = ({ children }) => {
  const { data, isSuccess, isLoading } = useGetMyProfile();

  const navigate = useRouter();

  useEffect(() => {
    if (isSuccess && !data) {
      navigate.push('/');
    }
  }, [navigate, data, isSuccess]);

  if (isLoading) return;

  return <>{children}</>;
};
