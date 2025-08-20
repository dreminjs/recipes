import { IPaginationQueryParameters } from '@/shared';

export type FindManyRecipesQueryParametersDto = Partial<{
  title: string;
  nationalCuisines: string[];
  holidays: string[];
  types: string[];
  maxSteps: number;
  maxIngredients: number;
  excludeIngredientsIds: string[];
}> &
  IPaginationQueryParameters;
