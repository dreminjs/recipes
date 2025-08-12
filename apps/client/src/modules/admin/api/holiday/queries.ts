import { IGetCharacteristicsQueryParameters, QUERY_KEYS } from '@/shared';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Prisma } from '@prisma/client';
import { holidayService } from './service';
import { useSetAtom } from 'jotai';
import { activeCellAtom, characteristicsAtom } from 'src/app/stores/characteristics.store';
import { useEffect } from 'react';
import { useNotificationActions } from '@/modules/notifications';

const QUERY_KEY = QUERY_KEYS.holiday;

export const useGetHolidays = ({
  title,
  page,
  limit,
}: IGetCharacteristicsQueryParameters) => {
  const setCharacteristics = useSetAtom(characteristicsAtom);

  const {
    ...props
  } = useQuery({
    queryKey: [QUERY_KEY, page, title],
    queryFn: () => holidayService.findMany({ limit, page, title }),
  });

  useEffect(() => {
    if (props.data?.items && props.isSuccess) {
      setCharacteristics(props.data.items)
    }
  }, [props.data?.items, props.isSuccess])

  return {
    ...props
  };
};

export const usePostHoliday = () => {

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  const setActiveCell = useSetAtom(activeCellAtom)

  return useMutation({
    mutationFn: (data: Prisma.HolidayCreateInput) =>
      holidayService.createOne({ ...data }),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      setActiveCell(null);

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

export const useDeleteHoliday = () => {
  return useMutation({
    mutationFn: (id: string) => holidayService.deleteOne({ id }),
    mutationKey: [QUERY_KEY],
  });
};

export const useDeleteManyHolidays = () => {

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => holidayService.deleteMany(ids),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      remove('info')
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

export const usePutHoliday = () => {

  const setActiveCell = useSetAtom(activeCellAtom)

  const { addError, remove, addInfo, addSuccess } = useNotificationActions()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Prisma.HolidayUpdateInput;
      id: string;
    }) => holidayService.updateOne({ id }, data),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      remove('info')
      setActiveCell(null)

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
