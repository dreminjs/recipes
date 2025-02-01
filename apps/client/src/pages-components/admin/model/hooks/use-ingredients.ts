import {  useDeleteManyNationalCuisine, useGetIngredients, usePostIngredient, usePostNationalCuisine } from 'apps/client/src/shared';
import { useDeleteIngredient, usePutIngredient } from 'apps/client/src/shared/api/queries/ingredient.queries';
import { ChangeEvent, useEffect, useState } from 'react';
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

  const { putIngredient,putIngredientIsError,putIngredientIsLoading,putIngredientIsSuccess } = usePutIngredient();
  const { deleteIngredient,deleteIngredientIsError,deleteIngredientIsLoading,deleteIngredientIsSuccess } = useDeleteIngredient();
  const { deleteManyNationalCuisines, deleteManyNationalCuisinesIsError, deleteManyNationalCuisinesIsLoading, deleteManyNationalCuisinesIsSuccess } = useDeleteManyNationalCuisine();
  const { ingredients,ingredientsIsError,ingredientsIsLoading,ingredientsIsSuccess,refetchIngredients } = useGetIngredients({ title: value, page: currentPage, limit });
  const { postIngredient, postIngredientIsError, postIngredientIsLoading, postIngredientIsSuccess } = usePostIngredient();

  useEffect(() => {
    if (postIngredientIsSuccess || deleteManyNationalCuisinesIsSuccess || putIngredientIsSuccess) {
      refetchIngredients();
    }
  }, [refetchIngredients, postIngredientIsSuccess, deleteManyNationalCuisinesIsSuccess, putIngredientIsSuccess]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setCurrentPage(newPage);
  const onChangeLimit = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return {
    title,
    currentPage,
    onChangePage,
    limit,
    setLimit,
    put: putIngredient,
    putIsLoading: putIngredientIsLoading,
    putIsError: putIngredientIsError,
    putIsSuccess: putIngredientIsSuccess,
    deleteOne: deleteIngredient,
    deleteIsLoading: deleteIngredientIsLoading,
    deleteIsError: deleteIngredientIsError,
    deleteIsSuccess: deleteIngredientIsSuccess,
    deleteMany: deleteManyNationalCuisines,
    deleteManyIsLoading: deleteManyNationalCuisinesIsLoading,
    deleteManyIsError: deleteManyNationalCuisinesIsError,
    deleteManyIsSuccess: deleteManyNationalCuisinesIsSuccess,
    items: ingredients,
    itemsIsLoading: ingredientsIsLoading,
    itemsIsError: ingredientsIsError,
    itemsIsSuccess: ingredientsIsSuccess,
    refetch: refetchIngredients,
    post: postIngredient,
    postIsLoading:  postIngredientIsLoading,
    postIsError: postIngredientIsError,
    postIsSuccess: postIngredientIsSuccess,
    onChangeTitle,
    onChangeLimit,
  }
}