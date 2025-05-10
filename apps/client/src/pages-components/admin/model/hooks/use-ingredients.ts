import { useSetAtom } from 'jotai';
import {
  useGetIngredients,
  usePostIngredient,
  useDeleteManyIngredients,
  usePutIngredient,
} from '../../api/ingredient/queries';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { UpdateCharacteristicDto } from 'src/shared/model/interfaces/characteristic.interface';
import { useDebounce } from 'use-debounce';
import { activeCellAtom } from 'src/application/stores/characteristics.store';

export const useIngredients = ({
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

  const {
    putIngredient,
    putIngredientIsError,
    putIngredientIsLoading,
    putIngredientIsSuccess,
  } = usePutIngredient();

  const {
    ingredients,
    ingredientsIsError,
    ingredientsIsLoading,
    ingredientsIsSuccess,
    refetchIngredients,
  } = useGetIngredients({ title: value, page: currentPage, limit });
  const {
    postIngredient,
    postIngredientIsError,
    postIngredientIsLoading,
    postIngredientIsSuccess,
  } = usePostIngredient();
  const {
    deleteManyIngredients,
    deleteManyIngredientsIsError,
    deleteManyIngredientsIsLoading,
    deleteManyIngredientsIsSuccess,
  } = useDeleteManyIngredients();

  useEffect(() => {
    if (
      postIngredientIsSuccess ||
      deleteManyIngredientsIsSuccess ||
      putIngredientIsSuccess
    ) {
      refetchIngredients();
    }
  }, [
    refetchIngredients,
    postIngredientIsSuccess,
    putIngredientIsSuccess,
    deleteManyIngredientsIsSuccess,
  ]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setCurrentPage(newPage);

  const handleChangeLimit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLimit(parseInt(event.target.value, 10));
      setCurrentPage(0);
    },
    []
  );

    const handlePutIngredient = (newCharacteristic: UpdateCharacteristicDto) => {
      if (newCharacteristic) {
        setActiveCell(null)
        if (typeof newCharacteristic.payload === 'boolean') {
          putIngredient({
            data: { isVisible: newCharacteristic.payload },
            id: newCharacteristic.id,
          });
        } else if (
          newCharacteristic.payload === 'ML' ||
          newCharacteristic.payload === 'L' ||
          newCharacteristic.payload === 'KG' ||
          newCharacteristic.payload === 'G' ||
          newCharacteristic.payload === 'N'
        ) {
          putIngredient({
            data: { measure: newCharacteristic.payload },
            id: newCharacteristic.id,
          });
        } else {
          putIngredient({
            data: { title: newCharacteristic.payload },
            id: newCharacteristic.id,
          });
        }
      }
    };

  const isLoading = deleteManyIngredientsIsLoading || putIngredientIsLoading || postIngredientIsLoading

  const isSuccess = deleteManyIngredientsIsSuccess || putIngredientIsSuccess || postIngredientIsSuccess 

  const isError =  deleteManyIngredientsIsError || postIngredientIsError || putIngredientIsError

  return {
    title,
    currentPage,
    onChangePage,
    onPut: handlePutIngredient,
    deleteMany: deleteManyIngredients,
    items: ingredients,
    itemsIsLoading: ingredientsIsLoading,
    itemsIsError: ingredientsIsError,
    itemsIsSuccess: ingredientsIsSuccess,
    refetch: refetchIngredients,
    post: postIngredient,
    onChangeTitle,
    onChangeLimit: handleChangeLimit,
    limit,
    isLoading,
    isSuccess,
    isError
  };
};
