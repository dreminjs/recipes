import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { recipeService } from '../services/recipe.service';
import { IGetRecipesQueryParameters } from '../../model/interfaces/recipe.interface';

export const useGetRecipes = (queryParams: IGetRecipesQueryParameters) => {
  const {
    data: recipes,
    hasNextPage,
    fetchNextPage,
    isLoading: isRecipesLoading,
    isSuccess: isRecipesSuccess,
    isError: isRecipesError,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.recipe, queryParams],
    queryFn: async ({ pageParam }) =>
      recipeService.findMany({ take: 10, cursor: pageParam, ...queryParams }),
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  });

  return {
    recipes,
    hasNextPage,
    fetchNextPage,
    isRecipesLoading,
    isRecipesSuccess,
    isRecipesError,
  };
};

// export const useGetRecipeSelection = (
//   queryParams: IGetRecipesQueryParameters
// ) => {
//   const {
//     data: recipeSelection,
//     isLoading: recipeSelectionIsLoading,
//     isError: recipeSelectionIsError,
//   } = useInfiniteQuery({
//     queryKey: [QUERY_KEYS.recipe, SERVICE_KEYS.selection, queryParams],
//     queryFn: async () => recipeService.findSelection(queryParams),
//   });

//   return { recipeSelection, recipeSelectionIsLoading, recipeSelectionIsError };
// };
