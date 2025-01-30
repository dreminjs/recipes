import { useMutation, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { ingredientService } from '../services/ingredient.service';
import { IIngredientForm } from '../../model/interfaces/ingredient.interface';

const queryKey = [QUERY_KEYS.ingredient]

export const useGetIngredients = ({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}) => {
  const {
    data: ingredients,
    isLoading: ingredientsIsLoading,
    isSuccess: ingredientsIsSuccess,
    isError: ingredientsIsError,
    refetch: refetchIngredients,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      ingredientService.findMany({ limit, page, title }),
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
    mutationFn: (data: IIngredientForm) =>
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
    mutate: deleteHoliday,
    isLoading: deleteHolidayIsLoading,
    isError: deleteHolidayIsError,
    isSuccess: deleteHolidayIsSuccess,
  } = useMutation({
    mutationFn: (id: string) => ingredientService.deleteOne({ id }),
    mutationKey: [queryKey],
  });
  return {
    deleteHolidayIsSuccess,
    deleteHolidayIsError,
    deleteHolidayIsLoading,
    deleteHoliday,
  };
};

export const usePutIngredient = () => {
  const {
    mutate: putHoliday,
    isLoading: putHolidayIsLoading,
    isError: putHolidayIsError,
    isSuccess: putHolidayIsSuccess,
  } = useMutation({
    mutationFn: ({ data, id }: { data: IIngredientForm; id: string }) =>
      ingredientService.updateOne({ id }, data),
    mutationKey: [queryKey],
  });

  return {
    putHoliday,
    putHolidayIsError,
    putHolidayIsSuccess,
    putHolidayIsLoading,
  };
};
