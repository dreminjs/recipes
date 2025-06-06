import { QUERY_KEYS, SERVICE_KEYS } from "@/shared*";
import { useQuery } from "@tanstack/react-query";
import { findMySelf } from "./service";

export const useGetMyProfile = () => {
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
  } = useQuery({
    queryFn: () => findMySelf(),
    queryKey: [SERVICE_KEYS.user,QUERY_KEYS.me],
    retry: false,
    refetchOnWindowFocus: false, 
  });

  return { userInfo, userInfoIsLoading, userInfoIsSuccess };
};
