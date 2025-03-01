import { QUERY_KEYS } from "@/shared*";
import { useQuery } from "@tanstack/react-query";
import { findMySelf } from "./service";

export const useGetMyProfile = () => {
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isSuccess: userInfoIsSuccess,
  } = useQuery({
    queryFn: () => findMySelf(),
    queryKey: [QUERY_KEYS.user],
  });

  return { userInfo, userInfoIsLoading, userInfoIsSuccess };
};
