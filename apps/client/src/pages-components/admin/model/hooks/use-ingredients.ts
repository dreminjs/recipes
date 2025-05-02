import {
  useGetIngredients,
  usePostIngredient,
  useDeleteManyIngredients,
  usePutIngredient,
} from '../../api/ingredient/queries';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

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

  const isLoading = deleteManyIngredientsIsLoading || putIngredientIsLoading || postIngredientIsLoading

  const isSuccess = deleteManyIngredientsIsSuccess || putIngredientIsSuccess || postIngredientIsSuccess 

  const isError =  deleteManyIngredientsIsError || postIngredientIsError || putIngredientIsError

  return {
    title,
    currentPage,
    onChangePage,
    put: putIngredient,
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
