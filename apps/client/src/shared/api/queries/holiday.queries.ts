import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { Prisma } from 'prisma/prisma-client';
import { holidayService } from '../services/holiday.service';

export const useGetHolidays = ({ title }: { title?: string }) => {
  const {
    data: holidays,
    isLoading: holidaysIsLoading,
    isSuccess: holidaysIsSuccess,
    fetchNextPage,
    hasNextPage,
    isError: holidaysIsError,
    refetch: refetchHolidays,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.holiday],
    queryFn: ({ pageParam }) =>
      holidayService.findMany({ limit: 10, cursor: pageParam, title }),
  });

  return {
    holidays,
    fetchNextPage,
    hasNextPage,
    holidaysIsLoading,
    holidaysIsError,
    holidaysIsSuccess,
    refetchHolidays,
  };
};

export const usePostHoliday = () => {
  const {
    mutate: postHoliday,
    isLoading: postHolidayIsLoading,
    isError: postHolidayIsError,
    isSuccess: postHolidayIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.HolidayCreateInput) =>
      holidayService.createOne({ ...data }),
    mutationKey: [QUERY_KEYS.holiday],
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
    isLoading: deleteHolidayIsLoading,
    isError: deleteHolidayIsError,
    isSuccess: deleteHolidayIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => holidayService.deleteOne({ id }),
    mutationKey: [QUERY_KEYS.holiday],
  });
  return {
    deleteHolidayIsSuccess,
    deleteHolidayIsError,
    deleteHolidayIsLoading,
    deleteHoliday,
  };
};

export const usePutHoliday = () => {
  const {
    mutate: putHoliday,
    isLoading: putHolidayIsLoading,
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
    mutationKey: [QUERY_KEYS.holiday],
  });

  return {
    putHoliday,
    putHolidayIsError,
    putHolidayIsSuccess,
    putHolidayIsLoading,
  };
};
