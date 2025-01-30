import { useMutation, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { Prisma } from 'prisma/prisma-client';
import { nationalCuisineService } from '../services/national-cuisine.service';
import { useCharacteristics } from '../../model/hooks/use-characteristics';

export const useGetNationalCuisines = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {
  const { onSetCharacterstics } = useCharacteristics();

  const {
    data: nationalCuisines,
    isLoading: nationalCuisinesIsLoading,
    isSuccess: nationalCuisinesIsSuccess,
    isError: nationalCuisinesIsError,
    refetch: refetchNationalCuisines,
  } = useQuery({
    queryKey: [QUERY_KEYS.nationalCuisine, limit, page, title],
    queryFn: () => nationalCuisineService.findMany({ limit, page, title }),
    onSuccess: (data) =>
      onSetCharacterstics({
        items: [...data.items],
        countItems: data.countItems,
        currentPage: data.currentPage,
      }),
  });

  return {
    nationalCuisines,
    nationalCuisinesIsLoading,
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

export const useDeleteManyNationalCuisine = () => {
  const { onSetCharacterstics, onSelectCharacteristic } = useCharacteristics();
  const {
    mutate: deleteManyNationalCuisines,
    isLoading: deleteManyNationalCuisinesIsLoading,
    isError: deleteManyNationalCuisinesIsError,
    isSuccess: deleteManyNationalCuisinesIsSuccess,
  } = useMutation({
    mutationFn: (ids: string[]) => nationalCuisineService.deleteMany(ids),
    mutationKey: [QUERY_KEYS.nationalCuisine],
  });
  return {
    deleteManyNationalCuisinesIsSuccess,
    deleteManyNationalCuisinesIsError,
    deleteManyNationalCuisinesIsLoading,
    deleteManyNationalCuisines,
  };
};

export const usePutNationalCuisine = () => {
  const { onHideInputCell } = useCharacteristics();
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
    onSuccess: () => {
      onHideInputCell();
    },
  });

  return {
    putNationalCuisine,
    putNationalCuisineIsLoading,
    putNationalCuisineIsError,
    putNationalCuisineIsSuccess,
  };
};
