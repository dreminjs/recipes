import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePutNationalCuisine,
  useDeleteNationalCuisine,
  useDeleteManyNationalCuisine,
  useGetNationalCuisines,
  usePostNationalCuisine,
} from '../../api/national-cuisine/queries';
import { useSetAtom } from 'jotai';
import { UpdateCharacteristicDto } from 'src/shared/model/interfaces/characteristic.interface';
import {
  activeCellAtom,
  selectedCharacteristicsIdsAtom,
} from 'src/application/stores/characteristics.store';

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
    putNationalCuisine,
    putNationalCuisineIsLoading,
    putNationalCuisineIsError,
    putNationalCuisineIsSuccess,
  } = usePutNationalCuisine();
  const {
    deleteNationalCuisine,
    deleteNationalCuisineIsError,
    deleteNationalCuisineIsLoading,
    deleteNationalCuisineIsSuccess,
  } = useDeleteNationalCuisine();
  const {
    deleteManyNationalCuisines,
    deleteManyNationalCuisinesIsError,
    deleteManyNationalCuisinesIsLoading,
    deleteManyNationalCuisinesIsSuccess,
  } = useDeleteManyNationalCuisine();
  const {
    nationalCuisines,
    nationalCuisinesIsLoading,
    nationalCuisinesIsError,
    nationalCuisinesIsSuccess,
    refetchNationalCuisines,
  } = useGetNationalCuisines({ title: value, page: currentPage, limit });
  const {
    postNationalCuisine,
    postNationalCuisineIsError,
    postNationalCuisineIsLoading,
    postNationalCuisineIsSuccess,
  } = usePostNationalCuisine();

  useEffect(() => {
    if (
      postNationalCuisineIsSuccess ||
      deleteManyNationalCuisinesIsSuccess ||
      putNationalCuisineIsSuccess
    ) {
      refetchNationalCuisines();
    }
  }, [
    refetchNationalCuisines,
    postNationalCuisineIsSuccess,
    deleteManyNationalCuisinesIsSuccess,
    putNationalCuisineIsSuccess,
  ]);

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

  const isLoading =
    deleteNationalCuisineIsLoading ||
    putNationalCuisineIsLoading ||
    postNationalCuisineIsLoading ||
    deleteManyNationalCuisinesIsLoading;

  const isSuccess =
    deleteNationalCuisineIsSuccess ||
    putNationalCuisineIsSuccess ||
    postNationalCuisineIsSuccess ||
    deleteManyNationalCuisinesIsSuccess;
  const isError =
    putNationalCuisineIsSuccess ||
    postNationalCuisineIsSuccess ||
    deleteNationalCuisineIsError ||
    postNationalCuisineIsError ||
    putNationalCuisineIsError ||
    deleteManyNationalCuisinesIsError;

  return {
    title,
    currentPage,
    onChangePage,
    limit,
    setLimit,
    onPut: handlePutNationalCuisine,
    deleteOne: deleteNationalCuisine,
    deleteMany: deleteManyNationalCuisines,
    items: nationalCuisines,
    itemsIsLoading: nationalCuisinesIsLoading,
    itemsIsError: nationalCuisinesIsError,
    itemsIsSuccess: nationalCuisinesIsSuccess,
    refetch: refetchNationalCuisines,
    post: postNationalCuisine,
    onChangeTitle,
    onChangeLimit,
    isLoading,
    isError,
    isSuccess,
  };
};
