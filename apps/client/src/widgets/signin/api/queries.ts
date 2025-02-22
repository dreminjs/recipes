import { useRouter } from "next/router";
import { ISignIn } from "../model/interface";
import { useMutation } from "@tanstack/react-query";
import { PAGE_KEYS } from "@/shared*";
import { signin } from "./service";

export const usePostSignIn = () => {
  const { push: navigate } = useRouter();

  const { mutate, isLoading, data, isSuccess, isError } = useMutation({
    mutationFn: (data: ISignIn) => signin(data),
    onSuccess: (data) => {
      console.log(data);
      if (!data.isActived) {
        navigate(PAGE_KEYS.emailConfirm);
      } else {
        navigate('/');
      }
    },
  });
 
  return {
    signin: mutate,
    signinIsLoading: isLoading,
    signinData: data,
    signinIsSuccess: isSuccess,
    signinIsError: isError,
  };
};
