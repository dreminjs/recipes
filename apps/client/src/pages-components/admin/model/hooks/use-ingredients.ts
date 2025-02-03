import {
  useDeleteManyNationalCuisine,
  useGetIngredients,
  usePostIngredient,
  usePostNationalCuisine,
  useDeleteManyIngredients,
  usePutIngredient,
} from 'apps/client/src/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useIngredients = ({
  initialTitle,
  initialPage,
  limit,
}: {
  initialTitle: string;
  initialPage: number;
  limit: number;
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [value] = useDebounce(title, 500);
  const [currentPage, setCurrentPage] = useState(initialPage);

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
      postIngredientIsSuccess || deleteManyIngredientsIsSuccess ||
      putIngredientIsSuccess
    ) {
      refetchIngredients();
    }
  }, [
    refetchIngredients,
    postIngredientIsSuccess,
    putIngredientIsSuccess,
    deleteManyIngredientsIsSuccess
  ]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setCurrentPage(newPage);

  return {
    title,
    currentPage,
    onChangePage,
    put: putIngredient,
    putIsLoading: putIngredientIsLoading,
    putIsError: putIngredientIsError,
    putIsSuccess: putIngredientIsSuccess,
    deleteMany: deleteManyIngredients,
    deleteManyIsLoading: deleteManyIngredientsIsLoading,
    deleteManyIsError: deleteManyIngredientsIsError,
    deleteManyIsSuccess: deleteManyIngredientsIsSuccess,
    items: ingredients,
    itemsIsLoading: ingredientsIsLoading,
    itemsIsError: ingredientsIsError,
    itemsIsSuccess: ingredientsIsSuccess,
    refetch: refetchIngredients,
    post: postIngredient,
    postIsLoading: postIngredientIsLoading,
    postIsError: postIngredientIsError,
    postIsSuccess: postIngredientIsSuccess,
    onChangeTitle,
  };
};
