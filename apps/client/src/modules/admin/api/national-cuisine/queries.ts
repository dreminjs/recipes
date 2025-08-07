import { QUERY_KEYS } from '@/shared';
import { Prisma } from '@prisma/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { nationalCuisineService } from './service';
import { useSetAtom } from 'jotai';
import { activeCellAtom, characteristicsAtom } from 'src/app/stores/characteristics.store';
import { useEffect } from 'react';
import { useNotificationActions } from '@/modules/notifications';

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
    isSuccess,
    ...props
  } = useQuery({
    queryKey: [MUTATION_KEY, limit, page, title],
    queryFn: () => nationalCuisineService.findMany({ limit, page, title }),
  });

  useEffect(() => {
    if (isSuccess && props.data?.items) {
      setCharacteristics(props.data?.items)
    }
  }, [isSuccess, props.data?.items])

  return {
    isSuccess,
    ...props
  }
};

export const usePostNationalCuisine = () => {

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Prisma.NationalCuisineCreateInput) =>
      nationalCuisineService.createOne({ ...data }),
    mutationKey: [MUTATION_KEY],
    onError: () => {
      remove("info")
      addError()
    },
    onMutate: () => addInfo(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MUTATION_KEY]
      })
      remove("info")
      addSuccess()
    }
  });
};

export const useDeleteNationalCuisine = () => {
  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => nationalCuisineService.deleteOne({ id }),
    mutationKey: [MUTATION_KEY],
    onError: () => {
      remove("info")
      addError()
    },
    onMutate: () => addInfo(),
    onSuccess: () => {
      remove("info")
      queryClient.invalidateQueries({
        queryKey: [MUTATION_KEY]
      })
      addSuccess()
    }
  });
};

export const useDeleteManyNationalCuisine = () => {

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => nationalCuisineService.deleteMany(ids),
    mutationKey: [MUTATION_KEY],
    onMutate: () => addInfo(),
    onError: () => {
      remove("info")
      addError()
    },
    onSuccess: () => {
      remove("info")
      queryClient.invalidateQueries({
        queryKey: [MUTATION_KEY]
      })
      addSuccess()
    }
  });
};

export const usePutNationalCuisine = () => {

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const setActiveCell = useSetAtom(activeCellAtom)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Prisma.NationalCuisineUpdateInput;
      id: string;
    }) => nationalCuisineService.updateOne({ id }, data),
    mutationKey: [MUTATION_KEY],
    onSuccess: () => {
      remove("info")
      queryClient.invalidateQueries({
        queryKey: [MUTATION_KEY]
      })
      addSuccess()
      setActiveCell(null)
    },
    onError: () => {
      remove("info")
      addError()
    },
    onMutate: () => addInfo()
  });
};
