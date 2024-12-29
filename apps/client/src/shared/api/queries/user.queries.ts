import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/user.service';

export const useGetMyProfile = () => {
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
  } = useQuery({
    queryFn: () => userService.index(),
  });

  return { userInfo, userInfoIsLoading, userInfoIsSuccess };
};
