import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendDisableTwoFaRequest, sendEnableTwoFaRequest } from './service';
import { SERVICE_KEYS, QUERY_KEYS } from '@/shared*';

export const useSendEnableTwoFaRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sendEnableTwoFaRequest(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SERVICE_KEYS.user, QUERY_KEYS.me],
      }),
  });
};

export const useSendDisableTwoFaRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sendDisableTwoFaRequest(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SERVICE_KEYS.user, QUERY_KEYS.me],
      }),
  });
};
