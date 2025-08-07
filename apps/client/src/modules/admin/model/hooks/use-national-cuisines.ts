import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSetAtom } from 'jotai';
import { UpdateCharacteristicDto } from 'src/shared/model/interfaces/characteristic.interface';
import { activeCellAtom, selectedCharacteristicsIdsAtom } from 'src/app/stores/characteristics.store';
import { usePutNationalCuisine, useDeleteNationalCuisine, useDeleteManyNationalCuisine, useGetNationalCuisines, usePostNationalCuisine } from '../../api/national-cuisine/queries';

export const useNationalCuisines = ({
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
    mutate: putNationalCuisine,
  } = usePutNationalCuisine();
  const {
    mutate: deleteNationalCuisine,
  } = useDeleteNationalCuisine();
  const {
    mutate: deleteManyNationalCuisines,
  } = useDeleteManyNationalCuisine();
  const {
    data,
    refetch: refetchNationalCuisines
  } = useGetNationalCuisines({ title: value, page: currentPage, limit });
  const {
    mutate: postNationalCuisine,
  } = usePostNationalCuisine();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangePage = (newPage: number) => {
    setCurrentPage(newPage);
    setCharacteristicsIds([])
  };
  const onChangeLimit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handlePutNationalCuisine = (
    newCharacteristic: UpdateCharacteristicDto
  ) => {
    if (newCharacteristic) {
      setActiveCell(null);
      if (typeof newCharacteristic.payload === 'boolean') {
        putNationalCuisine({
          data: { isVisible: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      } else {
        putNationalCuisine({
          data: { title: newCharacteristic.payload },
          id: newCharacteristic.id,
        });
      }
    }
  };

  return {
    title,
    currentPage,
    onChangePage,
    limit,
    setLimit,
    onPut: handlePutNationalCuisine,
    deleteOne: deleteNationalCuisine,
    deleteMany: deleteManyNationalCuisines,
    items: data,
    refetch: refetchNationalCuisines,
    post: postNationalCuisine,
    onChangeTitle,
    onChangeLimit,
  };
};
