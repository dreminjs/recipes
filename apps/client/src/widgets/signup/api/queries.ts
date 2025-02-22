import { useRouter } from "next/router";
import { signup } from "./service";
import { useMutation } from "@tanstack/react-query";
import { ISignUp, PAGE_KEYS } from "@/shared*";

export const usePostSignUp = () => {
  const { push: navigate } = useRouter();

  const { mutate, isLoading, data, isSuccess, isError } = useMutation({
    mutationFn: (data: ISignUp) => signup(data),
    onSuccess: () => {
      navigate(PAGE_KEYS.emailConfirm);
    },
  });

  return {
    signup: mutate,
    signupIsLoading: isLoading,
    signupData: data,
    signupIsSuccess: isSuccess,
    signupIsError: isError,
  };
};