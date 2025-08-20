import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateRecipeDto } from '../types/create-recipe.dto';
import { createOne, findMany } from './services';
import { useNotificationActions } from '@/modules/notifications';
import { useClearRecipeAdditionals } from '../hooks/use-clear-recipe.additionals';
import { SERVICE_KEYS } from '@/shared';
import { FindManyRecipesQueryParametersDto } from '../types/find-many-recipes.dto';

export const usePostRecipe = () => {
  const { addError, addInfo, addSuccess, remove } = useNotificationActions();

  const clearRecipeAdditionals = useClearRecipeAdditionals()

  return useMutation({
    mutationFn: (data: CreateRecipeDto) =>
      createOne({
        ...data,
      }),
      onMutate: () => addInfo(),
      onSuccess: () => {
        remove("info")
        clearRecipeAdditionals()
        addSuccess()
      },
      onError: () => {
        remove("info")
        clearRecipeAdditionals()
        addError()
      }
  });
};

export const useGetRecipes = (dto: FindManyRecipesQueryParametersDto) => {

  return useQuery({
    queryFn: () => findMany(dto),
    queryKey: [SERVICE_KEYS.recipes, Object.values(dto)]
  })
}
