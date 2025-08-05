import { useMutation } from '@tanstack/react-query';
import { logout } from './service';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { QUERY_KEYS, SERVICE_KEYS } from '@/shared/';
import { currentUserAtom } from '@/app/stores/auth.store';

export const useLougout = () => {
  const { push: navigate } = useRouter();
  const setCurrentUser = useSetAtom(currentUserAtom);

 return useMutation({
    mutationKey: [SERVICE_KEYS.auth, QUERY_KEYS.signout],
    mutationFn: () => logout(),
    onSuccess: () => {
      setCurrentUser(null);
      navigate('/');
    },
  });
};
