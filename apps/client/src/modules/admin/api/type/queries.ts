import { QUERY_KEYS } from '@/shared';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Prisma } from '@prisma/client';
import { typeService } from './service';
import { useSetAtom } from 'jotai';
import { activeCellAtom, characteristicsAtom } from 'src/app/stores/characteristics.store';
import { useNotificationActions } from '@/modules/notifications';
import { useEffect } from 'react';

const QUERY_KEY = QUERY_KEYS.type;

export const useGetTypes = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {

  const setCharacteristics = useSetAtom(characteristicsAtom)

  const {
    ...props
  } = useQuery({
    queryKey: [QUERY_KEY, page, title, limit],
    queryFn: () => typeService.findMany({ limit, page, title }),
  });

  useEffect(() => {
    if (props.isSuccess && props.data?.items) {
      setCharacteristics(props.data.items)
    }
  }, [props.isSuccess, props.data?.items])

  return {
    ...props
  };
};

export const usePostType = () => {

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Prisma.TypeCreateInput) =>
      typeService.createOne({ ...data }),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      remove("info")
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY]
      })
      addSuccess()
    },
    onError: () => {
      remove('info')
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY]
      })
      addError()
    },
    onMutate: () => addInfo()
  });
};

export const useDeleteType = () => {
  return useMutation({
    mutationFn: (id: string) => typeService.deleteOne({ id }),
    mutationKey: [QUERY_KEY],
  });
};

export const usePutType = () => {
  const setActiveCell = useSetAtom(activeCellAtom);

  const queryClient = useQueryClient()

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  return useMutation({
    mutationFn: ({ data, id }: { data: Prisma.TypeUpdateInput; id: string }) =>
      typeService.updateOne({ id }, data),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      remove("info")
      setActiveCell(null);
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY]
      })
      addSuccess()
    },
    onError: () => {
      remove("info")
      setActiveCell(null);
      addError()
    },
    onMutate: () => {
      addInfo()
    }
  });

};

export const useDeleteManyTypes = () => {

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => typeService.deleteMany(ids),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      remove("info")
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY]
      })
      addSuccess()
    },
    onError: () => {
      remove("info")
      addError()
    },
    onMutate: () => {
      addInfo()
    }
  });
};
