import { useCharacteristics, QUERY_KEYS } from "@/shared*";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Prisma } from "prisma/prisma-client";
import { holidayService } from "./service";

const QUERY_KEY = QUERY_KEYS.holiday

export const useGetHolidays = ({
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
    data: holidays,
    isLoading: holidaysIsLoading,
    isSuccess: holidaysIsSuccess,
    isError: holidaysIsError,
    refetch: refetchHolidays,
  } = useQuery({
    queryKey: [QUERY_KEY,page,title],
    queryFn: () => holidayService.findMany({ limit, page, title }),
    onSuccess: (data) =>
      onSetCharacterstics({
        items: [...data.items],
        countItems: data.countItems,
        currentPage: data.currentPage,
      }),
  });

  return {
    holidays,
    holidaysIsLoading,
    holidaysIsError,
    holidaysIsSuccess,
    refetchHolidays,
  };
};

export const usePostHoliday = () => {
  const { onHideInputCell } = useCharacteristics();
  const {
    mutate: postHoliday,
    isLoading: postHolidayIsLoading,
    isError: postHolidayIsError,
    isSuccess: postHolidayIsSuccess,
  } = useMutation({
    mutationFn: (data: Prisma.HolidayCreateInput) =>
      holidayService.createOne({ ...data }),
    mutationKey: [QUERY_KEY],
    onSuccess: () => {
      onHideInputCell();
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
    isLoading: deleteHolidayIsLoading,
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
    isLoading: deleteManyHolidayIsLoading,
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
  const { onHideInputCell } = useCharacteristics();
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
    mutationKey: [QUERY_KEY],
    onSuccess:() => {
      onHideInputCell()
    }
  });

  return {
    putHoliday,
    putHolidayIsError,
    putHolidayIsSuccess,
    putHolidayIsLoading,
  };
};
