import {
  InputSearch,
  useDeleteHoliday,
  useGetHolidays,
  usePostHoliday,
  usePutHoliday,
} from '../../../shared';
import {
  AdminCharacteristicsList,
  AdminPostCharacteristic,
} from '../../../features/admin';
import { MessageModal } from '../../../features/message';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Prisma } from 'prisma/prisma-client';

export const AdminHolidaysPage = () => {
  const [title, setTitle] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  const [currentCharacteristicIdx, setCurrentCharacteristicIdx] = useState<
    number | null
  >(null);

  const [value] = useDebounce(title, 500);

  const {
    postHoliday,
    postHolidayIsLoading,
    postHolidayIsError,
    postHolidayIsSuccess,
  } = usePostHoliday();

  const {
    putHoliday,
    putHolidayIsLoading,
    putHolidayIsError,
    putHolidayIsSuccess,
  } = usePutHoliday();

  const {
    deleteHoliday,
    deleteHolidayIsLoading,
    deleteHolidayIsError,
    deleteHolidayIsSuccess,
  } = useDeleteHoliday();

  const {
    fetchNextPage,
    hasNextPage,
    holidays,
    holidaysIsError,
    holidaysIsSuccess,
    holidaysIsLoading,
    refetchHolidays,
  } = useGetHolidays({
    title: value,
  });

  const handleShowInput = (idx: number) => {
    setCurrentCharacteristicIdx(idx);
    setIsVisible((prev) => !prev);
  };

  const handleHideInput = () => {
    setCurrentCharacteristicIdx(null);
    setIsVisible((prev) => !prev);
  };

  const handlePutHoliday = (data: Prisma.HolidayUpdateInput, id: string) => {
    handleHideInput();
    putHoliday({ data, id });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  useEffect(() => {
    if (postHolidayIsSuccess || deleteHolidayIsSuccess || putHolidayIsSuccess) {
      refetchHolidays();
    }
  }, [
    postHolidayIsSuccess,
    deleteHolidayIsSuccess,
    putHolidayIsSuccess,
    refetchHolidays,
    value,
  ]);

  return (
    <>
      <div className="flex flex-col items-center">
        <AdminPostCharacteristic
          onPost={(data) => postHoliday(data)}
          label="holiday"
        />
        <InputSearch value={title} onChange={handleTitleChange} />
        <AdminCharacteristicsList
          onShowInput={handleShowInput}
          onHideInput={handleHideInput}
          visibleIdx={currentCharacteristicIdx}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          characteristicsIsError={holidaysIsError}
          characteristicsIsLoading={holidaysIsError}
          characteristicIsSuccess={holidaysIsError}
          onDelete={deleteHoliday}
          onPut={handlePutHoliday}
          characteristics={holidays}
        />
      </div>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={
          postHolidayIsLoading ||
          deleteHolidayIsLoading ||
          putHolidayIsLoading
        }
        isError={
          postHolidayIsError || deleteHolidayIsError || putHolidayIsError
        }
        isSuccess={
          postHolidayIsSuccess || deleteHolidayIsSuccess || putHolidayIsSuccess
        }
      />
    </>
  );
};
