import { useInfiniteQuery } from '@tanstack/react-query';
import { recipeService } from './recipe.service';
import { IGetRecipesQueryParameters } from 'src/shared/model/interfaces/recipe.interface';
import { QUERY_KEYS } from 'src/shared/model/constants';

export const useGetRecipes = (
  queryParams: IGetRecipesQueryParameters,
  { enabled }: { enabled?: boolean } = {}
) => {
  
  const {
    data: recipes,
    hasNextPage,
    fetchNextPage,
    isLoading: isRecipesLoading,
    isSuccess: isRecipesSuccess,
    isError: isRecipesError,
  } = useInfiniteQuery({
    // queryKey: [QUERY_KEYS.recipe, queryParams],
    // queryFn: async ({ pageParam }) =>
    //   recipeService.findMany({ take: 10, cursor: pageParam, ...queryParams }),
    // getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    // enabled: enabled !== undefined && enabled
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
