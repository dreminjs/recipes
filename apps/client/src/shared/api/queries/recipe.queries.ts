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
    queryKey: [QUERY_KEYS.recipe],
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
