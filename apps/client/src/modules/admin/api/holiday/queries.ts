import { QUERY_KEYS } from '@/shared';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Prisma } from '@prisma/client';
import { holidayService } from './service';
import { useSetAtom } from 'jotai';
import { activeCellAtom, characteristicsAtom } from 'src/app/stores/characteristics.store';
import { useEffect } from 'react';

const QUERY_KEY = QUERY_KEYS.holiday;

export const useGetHolidays = ({
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
  const setActiveCell = useSetAtom(activeCellAtom)
  const {
    mutate: postHoliday,
    isPending: postHolidayIsLoading,
    isError: postHolidayIsError,
    isSuccess: postHolidayIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.HolidayCreateInput) =>
      holidayService.createOne({ ...data }),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      setActiveCell(null);
    },
  });

  return {
    postHoliday,
    postHolidayIsLoading,
    postHolidayIsError,
    postHolidayIsSuccess,
  };
};

export const useDeleteHoliday = () => {
  const {
    mutate: deleteHoliday,
    isPending: deleteHolidayIsLoading,
    isError: deleteHolidayIsError,
    isSuccess: deleteHolidayIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => holidayService.deleteOne({ id }),
    mutationKey: [QUERY_KEY],
  });
  return {
    deleteHolidayIsSuccess,
    deleteHolidayIsError,
    deleteHolidayIsLoading,
    deleteHoliday,
  };
};

export const useDeleteManyHolidays = () => {
  const {
    mutate: deleteManyHoliday,
    isPending: deleteManyHolidayIsLoading,
    isError: deleteManyHolidayIsError,
    isSuccess: deleteManyHolidayIsSuccess,
  } = useMutation({
    mutationFn: (ids: string[]) => holidayService.deleteMany(ids),
    mutationKey: [QUERY_KEY],
  });
  return {
    deleteManyHolidayIsSuccess,
    deleteManyHolidayIsError,
    deleteManyHolidayIsLoading,
    deleteManyHoliday,
  };
};

export const usePutHoliday = () => {

  const setActiveCell = useSetAtom(activeCellAtom)

  const {
    mutate: putHoliday,
    isPending: putHolidayIsLoading,
    isError: putHolidayIsError,
    isSuccess: putHolidayIsSuccess,
  } = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Prisma.HolidayUpdateInput;
      id: string;
    }) => holidayService.updateOne({ id }, data),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      setActiveCell(null)
    },
  });

  return {
    putHoliday,
    putHolidayIsError,
    putHolidayIsSuccess,
    putHolidayIsLoading,
  };
};
