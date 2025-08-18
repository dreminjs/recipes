import { useMutation } from '@tanstack/react-query';
import { CreateRecipeDto } from '../types/create-recipe.dto';
import { createOne } from './services';
import { useNotificationActions } from '@/modules/notifications';
import { useClearRecipeAdditionals } from '../hooks/use-clear-recipe.additionals';

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
