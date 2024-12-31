import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { IGetCharacteristicsQueryParameters } from '../../model/interfaces/characteristic.interface';
import { QUERY_KEYS } from '../../model/constants';
import { typeService } from '../services/type.service';
import { Prisma } from 'prisma/prisma-client';

export const useGetTypes = (query: IGetCharacteristicsQueryParameters) => {
  const {
    data: types,
    isLoading: typesIsLoading,
    fetchNextPage,
    hasNextPage,
    isError: typesIsError,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.type, query],
    queryFn: () => typeService.findMany(query),
  });

  return { types, typesIsLoading, fetchNextPage, hasNextPage, typesIsError };
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
