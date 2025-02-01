import { useMutation, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { ingredientService } from '../services/ingredient.service';
import { IPostIngredientForm } from '../../model/interfaces/ingredient.interface';
import { Prisma } from 'prisma/prisma-client';
import { useCharacteristics } from '../../model/hooks/use-characteristics';

const queryKey = QUERY_KEYS.ingredient;

export const useGetIngredients = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {
  const { onSetCharacterstics } = useCharacteristics();

  const {
    data: ingredients,
    isLoading: ingredientsIsLoading,
    isSuccess: ingredientsIsSuccess,
    isError: ingredientsIsError,
    refetch: refetchIngredients,
  } = useQuery({
    queryKey: [queryKey, limit, page, title],
    queryFn: () => ingredientService.findMany({ limit, page, title }),
    onSuccess(data) {
      onSetCharacterstics({
        items: [...data.items],
        countItems: data.countItems,
        currentPage: data.currentPage,
      });
    },
  });

  return {
    ingredients,
    ingredientsIsLoading,
    ingredientsIsError,
    ingredientsIsSuccess,
    refetchIngredients,
  };
};

export const usePostIngredient = () => {
  const {
    mutate: postIngredient,
    isLoading: postIngredientIsLoading,
    isError: postIngredientIsError,
    isSuccess: postIngredientIsSuccess,
  } = useMutation({
    mutationFn: (data: IPostIngredientForm) =>
      ingredientService.createOne({ ...data }),
    mutationKey: [queryKey],
  });

  return {
    postIngredient,
    postIngredientIsLoading,
    postIngredientIsError,
    postIngredientIsSuccess,
  };
};

export const useDeleteIngredient = () => {
  const {
    mutate: deleteIngredient,
    isLoading: deleteIngredientIsLoading,
    isError: deleteIngredientIsError,
    isSuccess: deleteIngredientIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => ingredientService.deleteOne({ id }),
    mutationKey: [queryKey],
  });
  return {
    deleteIngredient,
    deleteIngredientIsLoading,
    deleteIngredientIsError,
    deleteIngredientIsSuccess,
  };
};

export const useDeleteManyIngredients = () => {
  const {
    mutate: deleteManyIngredients,
    isLoading: deleteManyIngredientsIsLoading,
    isError: deleteManyIngredientsIsError,
    isSuccess: deleteManyIngredientsIsSuccess,
  } = useMutation({
    mutationFn: (ids: string[]) => ingredientService.deleteMany(ids),
    mutationKey: [queryKey],
  });
  return {
    deleteManyIngredients,
    deleteManyIngredientsIsLoading,
    deleteManyIngredientsIsError,
    deleteManyIngredientsIsSuccess,
  };
};

export const usePutIngredient = () => {
  const { onHideInputCell } = useCharacteristics();
  const {
    mutate: putIngredient,
    isLoading: putIngredientIsLoading,
    isError: putIngredientIsError,
    isSuccess: putIngredientIsSuccess,
  } = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Prisma.IngredientUpdateInput;
      id: string;
    }) => ingredientService.updateOne({ id }, data),
    mutationKey: [queryKey],
    onSuccess: () => {
      onHideInputCell();
    },
  });
  return {
    putIngredient,
    putIngredientIsError,
    putIngredientIsSuccess,
    putIngredientIsLoading,
  };
};
