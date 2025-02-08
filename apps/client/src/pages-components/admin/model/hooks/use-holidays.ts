import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutHoliday,
  useDeleteManyHolidays,
  useGetHolidays,
  usePostHoliday,
} from 'apps/client/src/shared';

export const useHolidays = ({
  initialTitle,
  initialPage,
  initialLimit,
}: {
  initialTitle: string;
  initialPage: number;
  initialLimit: number;
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [value] = useDebounce(title, 500);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const { putHoliday, putHolidayIsError, putHolidayIsLoading, putHolidayIsSuccess } = usePutHoliday();
  const { deleteManyHoliday, deleteManyHolidayIsError, deleteManyHolidayIsLoading, deleteManyHolidayIsSuccess } = useDeleteManyHolidays();
  const { holidays, holidaysIsError, holidaysIsLoading, holidaysIsSuccess, refetchHolidays } = useGetHolidays({ title: value, page: currentPage, limit });
  const { postHoliday, postHolidayIsError, postHolidayIsLoading, postHolidayIsSuccess } = usePostHoliday();

  useEffect(() => {
    if (postHolidayIsSuccess || deleteManyHolidayIsSuccess || putHolidayIsSuccess) {
      refetchHolidays();
    }
  }, [refetchHolidays, postHolidayIsSuccess, deleteManyHolidayIsSuccess, putHolidayIsSuccess]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement> ) => setTitle(event.target.value);
  const handleChangePage = (newPage: number) => setCurrentPage(newPage);
  const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return {
    title,
    currentPage,
    onChangePage:handleChangePage,
    limit,
    setLimit,
    put: putHoliday,
    putIsLoading: putHolidayIsLoading,
    putIsError: putHolidayIsError,
    putIsSuccess: putHolidayIsSuccess,
    deleteMany: deleteManyHoliday,
    deleteManyIsLoading: deleteManyHolidayIsLoading,
    deleteManyIsError: deleteManyHolidayIsError,
    deleteManyIsSuccess: deleteManyHolidayIsSuccess,
    items: holidays,
    itemsIsLoading: holidaysIsLoading,
    itemsIsError: holidaysIsError,
    itemsIsSuccess: holidaysIsSuccess,
    refetch: refetchHolidays,
    post: postHoliday,
    postIsLoading: postHolidayIsLoading,
    postIsError: postHolidayIsError,
    postIsSuccess: postHolidayIsSuccess,
    onChangeTitle: handleChangeTitle,
    onChangeLimit: handleChangeLimit
  };
};
