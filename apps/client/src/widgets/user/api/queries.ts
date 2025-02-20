import { QUERY_KEYS } from "@/shared*";
import { useQuery } from "@tanstack/react-query";
import { userService } from "./service";

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
