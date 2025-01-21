import {
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { typeService } from '../services/type.service';
import { Prisma } from 'prisma/prisma-client';

export const useGetTypes = ({ title }: { title?: string }) => {
  const {
    data: types,
    isLoading: typesIsLoading,
    isSuccess: typesIsSuccess,
    fetchNextPage,
    hasNextPage,
    isError: typesIsError,
    refetch: refetchTypes,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.type],
    queryFn: ({ pageParam }) =>
      typeService.findMany({ limit: 10, cursor: pageParam, title }),
  });

  return {
    types,
    typesIsLoading,
    fetchNextPage,
    hasNextPage,
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
    mutationKey: [QUERY_KEYS.type],
  });

  return { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess };
};

export const useDeleteType = () => {
  const {
    mutate: deleleType,
    isLoading: deleteTypeIsLoading,
    isError: deleteTypeIsError,
    isSuccess: deleteTypeIsSuccess,
    
  } = useMutation({
    mutationFn: (id: string) => typeService.deleteOne({ id }),
    mutationKey: [QUERY_KEYS.type],
  });
  return {
    deleteTypeIsSuccess,
    deleteTypeIsError,
    deleteTypeIsLoading,
    deleleType,
  };
};

export const usePutType = () => {
  const {
    mutate: putType,
    isLoading: putTypeIsLoading,
    isError: putTypeIsError,
    isSuccess: putTypeIsSuccess,
  } = useMutation({
    mutationFn: ({ data, id }: { data: Prisma.TypeUpdateInput; id: string }) =>
      typeService.updateOne({ id }, data),
    mutationKey: [QUERY_KEYS.type],
  });

  return { putType, putTypeIsLoading, putTypeIsError, putTypeIsSuccess };
};
