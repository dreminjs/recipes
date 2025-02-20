import { useQuery } from '@tanstack/react-query';
import { userService } from './user.service';
import { QUERY_KEYS } from '../../../model/constants';

export const useGetMyProfile = () => {
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
  } = useQuery({
    queryFn: () => userService.index(),
    queryKey: [QUERY_KEYS.user],
  });

  return { userInfo, userInfoIsLoading, userInfoIsSuccess };
};
