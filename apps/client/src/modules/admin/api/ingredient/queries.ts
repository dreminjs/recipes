import { QUERY_KEYS, IPostIngredientForm, IGetCharacteristicsQueryParameters } from "@/shared*";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { ingredientService } from "./service";
import { useSetAtom } from "jotai";
import { activeCellAtom } from "src/app/stores/characteristics.store";
// import { characteristicsAtom } from "src/app/stores/characteristics.store";

const queryKey = QUERY_KEYS.ingredient;

export const useGetIngredients = ({
  title,
  page,
  limit,
}: IGetCharacteristicsQueryParameters
) => {

  // const setCharacteristics = useSetAtom(characteristicsAtom) 

  const {
    data: ingredients,
    isLoading: ingredientsIsLoading,
    isSuccess: ingredientsIsSuccess,
    isError: ingredientsIsError,
    refetch: refetchIngredients,
  } = useQuery({
    queryKey: [queryKey, limit, page, title],
    queryFn: () => ingredientService.findMany({ limit, page, title }),
  
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
    isPending: postIngredientIsLoading,
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
    isPending: deleteIngredientIsLoading,
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
    isPending: deleteManyIngredientsIsLoading,
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

  const setActiveCell = useSetAtom(activeCellAtom)

  const {
    mutate: putIngredient,
    isPending: putIngredientIsLoading,
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
      setActiveCell(null)
    },
  });
  return {
    putIngredient,
    putIngredientIsError,
    putIngredientIsSuccess,
    putIngredientIsLoading,
  };
};
