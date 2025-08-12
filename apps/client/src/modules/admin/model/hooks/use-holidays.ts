import { ChangeEvent, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutHoliday,
  useDeleteManyHolidays,
  useGetHolidays,
  usePostHoliday,
} from '../../api/holiday/queries';
import { UpdateCharacteristicDto } from 'src/shared/model/interfaces/characteristic.interface';
import { useSetAtom } from 'jotai';
import { activeCellAtom, selectedCharacteristicsIdsAtom } from 'src/app/stores/characteristics.store';

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
  
  const setActiveCell = useSetAtom(activeCellAtom);
  const setCharacteristicsIds = useSetAtom(selectedCharacteristicsIdsAtom);

  const {
    mutate: putHoliday,
  } = usePutHoliday();
  
  const {
    mutate: deleteManyHoliday,
  } = useDeleteManyHolidays();
  
  const {
   data: holidays,
  } = useGetHolidays({ title: value, page: currentPage, limit });
  
  const {
    mutate: postHoliday,
  } = usePostHoliday();

  const handleChangeTitle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTitle(event.target.value);
  const handleChangePage = (newPage: number) =>{ 
    setCurrentPage(newPage);
    setCharacteristicsIds([])
  }
  const handleChangeLimit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handlePutType = (newCharacteristic: UpdateCharacteristicDto) => {
    if (newCharacteristic) {
      setActiveCell(null)
      if (typeof newCharacteristic.payload === 'boolean') {
        putHoliday({
          data: { isVisible: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      } else {
        putHoliday({
          data: { title: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      }
    }
  };

  return {
    title,
    currentPage,
    onChangePage: handleChangePage,
    limit,
    setLimit,
    onPut: handlePutType,
    deleteMany: deleteManyHoliday,
    items: holidays,
    post: postHoliday,
    onChangeTitle: handleChangeTitle,
    onChangeLimit: handleChangeLimit,
  };
};
