import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutType,
  useDeleteType,
  useDeleteManyTypes,
  useGetTypes,
  usePostType,
} from '../../api/type/queries';
import { UpdateCharacteristicDto } from 'src/shared/model/interfaces/characteristic.interface';
import { useSetAtom } from 'jotai';
import { activeCellAtom, selectedCharacteristicsIdsAtom } from 'src/app/stores/characteristics.store';

export const useTypes = ({
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
  const setCharacteristicsIds = useSetAtom(selectedCharacteristicsIdsAtom)

  const { mutate: putType } =
    usePutType();

  const {
    mutate: deleteType,
  } = useDeleteType();
  const {
    mutate: deleteTypes,
  } = useDeleteManyTypes();

  const { data: types, } =
    useGetTypes({ title: value, page: currentPage, limit });

  const { mutate: postType } =
    usePostType();
    
  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value),[])

  const handleChangePage = useCallback((newPage: number) => {
    if (newPage >= 0 && newPage < Math.ceil((types?.itemsCount || 0) / limit)) {
      setCurrentPage(newPage);
      setCharacteristicsIds([])
    }
  },[limit, types?.itemsCount,setCharacteristicsIds])

  const handleChangeLimit = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  },[])

    const handlePutType = (newCharacteristic: UpdateCharacteristicDto) => {
      if (newCharacteristic) {
        setActiveCell(null)
        if (typeof newCharacteristic.payload === 'boolean') {
          putType({
            data: { isVisible: newCharacteristic.payload },
            id: newCharacteristic.id,
          });
        } else {
          putType({
            data: { title: newCharacteristic.payload },
            id: newCharacteristic.id,
          });
        }
      }
    };

  return {
    title,
    currentPage: Math.min(currentPage, Math.max(0, Math.ceil((types?.itemsCount || 0) / limit) - 1)),
    onChangePage: handleChangePage,
    limit,
    setLimit,
    onPut: handlePutType,
    deleteOne: deleteType,
    deleteMany:deleteTypes,
    items: types,
    post: postType,
    onChangeTitle: handleChangeTitle,
    onChangeLimit: handleChangeLimit,
  };
};
