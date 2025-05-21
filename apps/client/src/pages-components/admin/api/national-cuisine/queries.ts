import { QUERY_KEYS } from '@/shared';

import { Prisma } from '@prisma/client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { nationalCuisineService } from './service';
import { useSetAtom } from 'jotai';
import { activeCellAtom, characteristicsAtom } from 'src/application/stores/characteristics.store';

const MUTATION_KEY = QUERY_KEYS['national-cuisine'];

export const useGetNationalCuisines = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {
  const setCharacteristics = useSetAtom(characteristicsAtom);

  const {
    data: nationalCuisines,
    isLoading: nationalCuisinesIsLoading,
    isSuccess: nationalCuisinesIsSuccess,
    isError: nationalCuisinesIsError,
    refetch: refetchNationalCuisines,
  } = useQuery({
    queryKey: [MUTATION_KEY, limit, page, title],
    queryFn: () => nationalCuisineService.findMany({ limit, page, title }),
    // onSuccess: (data) => setCharacteristics(data.items),
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
    isPending: postNationalCuisineIsLoading,
    isError: postNationalCuisineIsError,
    isSuccess: postNationalCuisineIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.NationalCuisineCreateInput) =>
      nationalCuisineService.createOne({ ...data }),
    mutationKey: [MUTATION_KEY],
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
    isPending: deleteNationalCuisineIsLoading,
    isError: deleteNationalCuisineIsError,
    isSuccess: deleteNationalCuisineIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => nationalCuisineService.deleteOne({ id }),
    mutationKey: [MUTATION_KEY],
  });
  return {
    deleteNationalCuisineIsSuccess,
    deleteNationalCuisineIsError,
    deleteNationalCuisineIsLoading,
    deleteNationalCuisine,
  };
};

export const useDeleteManyNationalCuisine = () => {
  const {
    mutate: deleteManyNationalCuisines,
    isPending: deleteManyNationalCuisinesIsLoading,
    isError: deleteManyNationalCuisinesIsError,
    isSuccess: deleteManyNationalCuisinesIsSuccess,
  } = useMutation({
    mutationFn: (ids: string[]) => nationalCuisineService.deleteMany(ids),
    mutationKey: [MUTATION_KEY],
  });
  return {
    deleteManyNationalCuisinesIsSuccess,
    deleteManyNationalCuisinesIsError,
    deleteManyNationalCuisinesIsLoading,
    deleteManyNationalCuisines,
  };
};

export const usePutNationalCuisine = () => {

  const setActiveCell = useSetAtom(activeCellAtom)

  const {
    mutate: putNationalCuisine,
    isPending: putNationalCuisineIsLoading,
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
    mutationKey: [MUTATION_KEY],
    onSuccess: () => {
      setActiveCell(null)
    },
  });

  return {
    putNationalCuisine,
    putNationalCuisineIsLoading,
    putNationalCuisineIsError,
    putNationalCuisineIsSuccess,
  };
};
