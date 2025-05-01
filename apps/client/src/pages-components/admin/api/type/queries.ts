import { useCharacteristics, QUERY_KEYS } from "@/shared*";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Prisma } from "prisma/prisma-client";
import { typeService } from "./service";
import { useSetAtom } from "jotai";
import { characteristicsAtom } from "src/application/providers/characteristics-provider";

const QUERY_KEY = QUERY_KEYS.type

export const useGetTypes = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {

  const setCharacterstics = useSetAtom(characteristicsAtom) 

  const {
    data: types,
    isLoading: typesIsLoading,
    isSuccess: typesIsSuccess,
    isError: typesIsError,
    refetch: refetchTypes,
  } = useQuery({
    queryKey: [QUERY_KEY, page, title, limit],
    queryFn: () => typeService.findMany({ limit, page, title }),
    onSuccess: (data) =>
      setCharacterstics(data.items),
  });

  return {
    types,
    typesIsLoading,
    typesIsError,
    typesIsSuccess,
    refetchTypes,
  };
};

export const usePostType = () => {
  const {
    mutate: postType,
    isLoading: postTypeIsLoading,
    isError: postTypeIsError,
    isSuccess: postTypeIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.TypeCreateInput) =>
      typeService.createOne({ ...data }),
    mutationKey: [QUERY_KEY],
  });

  return { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess };
};

export const useDeleteType = () => {
  const {
    mutate: deleteType,
    isLoading: deleteTypeIsLoading,
    isError: deleteTypeIsError,
    isSuccess: deleteTypeIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => typeService.deleteOne({ id }),
    mutationKey: [QUERY_KEY],
  });
  return {
    deleteTypeIsSuccess,
    deleteTypeIsError,
    deleteTypeIsLoading,
    deleteType,
  };
};

export const usePutType = () => {
  const { onHideInputCell } = useCharacteristics()

  const {
    mutate: putType,
    isLoading: putTypeIsLoading,
    isError: putTypeIsError,
    isSuccess: putTypeIsSuccess,
  } = useMutation({
    mutationFn: ({ data, id }: { data: Prisma.TypeUpdateInput; id: string }) =>
      typeService.updateOne({ id }, data),
    mutationKey: [QUERY_KEY],
    onSuccess: () => onHideInputCell(),
  });

  return { putType, putTypeIsLoading, putTypeIsError, putTypeIsSuccess };
};

export const useDeleteManyTypes = () => {

  const {
    mutate: deleteTypes,
    isLoading: deleteTypesIsLoading,
    isSuccess: deleteTypesIsSuccess,
    isError: deleteTypesIsError,
  } = useMutation({
    mutationFn: (ids: string[]) => typeService.deleteMany(ids),
    mutationKey: [QUERY_KEY],
  });

  return {
    deleteTypes,
    deleteTypesIsSuccess,
    deleteTypesIsLoading,
    deleteTypesIsError,
  };
};
