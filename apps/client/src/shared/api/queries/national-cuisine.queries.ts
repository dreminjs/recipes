import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { Prisma } from 'prisma/prisma-client';
import { nationalCuisineService } from '../services/national-cuisine.service';

export const useGetNationalCuisines = ({ title }: { title?: string }) => {
  const {
    data: nationalCuisines,
    isLoading: nationalCuisinesIsLoading,
    isSuccess: nationalCuisinesIsSuccess,
    fetchNextPage,
    hasNextPage,
    isError: nationalCuisinesIsError,
    refetch: refetchNationalCuisines,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.nationalCuisine],
    queryFn: ({ pageParam }) =>
      nationalCuisineService.findMany({ limit: 10, cursor: pageParam, title }),
  });

  return {
    nationalCuisines,
    nationalCuisinesIsLoading,
    fetchNextPage,
    hasNextPage,
    nationalCuisinesIsError,
    nationalCuisinesIsSuccess,
    refetchNationalCuisines,
  };
};

export const usePostNationalCuisine = () => {
  const {
    mutate: postNationalCuisine,
    isLoading: postNationalCuisineIsLoading,
    isError: postNationalCuisineIsError,
    isSuccess: postNationalCuisineIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.NationalCuisineCreateInput) =>
      nationalCuisineService.createOne({ ...data }),
    mutationKey: [QUERY_KEYS.nationalCuisine],
  });

  return {
    postNationalCuisine,
    postNationalCuisineIsLoading,
    postNationalCuisineIsError,
    postNationalCuisineIsSuccess,
  };
};

export const useDeleteNationalCuisine = () => {
  const {
    mutate: deleteNationalCuisine,
    isLoading: deleteNationalCuisineIsLoading,
    isError: deleteNationalCuisineIsError,
    isSuccess: deleteNationalCuisineIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => nationalCuisineService.deleteOne({ id }),
    mutationKey: [QUERY_KEYS.nationalCuisine],
  });
  return {
    deleteNationalCuisineIsSuccess,
    deleteNationalCuisineIsError,
    deleteNationalCuisineIsLoading,
    deleteNationalCuisine,
  };
};

export const usePutNationalCuisine = () => {
  const {
    mutate: putNationalCuisine,
    isLoading: putNationalCuisineIsLoading,
    isError: putNationalCuisineIsError,
    isSuccess: putNationalCuisineIsSuccess,
  } = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Prisma.NationalCuisineUpdateInput;
      id: string;
    }) => nationalCuisineService.updateOne({ id }, data),
    mutationKey: [QUERY_KEYS.nationalCuisine],
  });

  return {
    putNationalCuisine,
    putNationalCuisineIsLoading,
    putNationalCuisineIsError,
    putNationalCuisineIsSuccess,
  };
};
