import { Recipe } from 'prisma/prisma-client';
import { SERVICE_KEYS } from '../../../model/constants';
import { IGetRecipesQueryParameters } from '../../../model/interfaces/recipe.interface';
import { instance } from '../../api.instance';
import { IInfiniteScrollResponse } from '@/interfaces';

export const recipeService = {
  axios: instance,

  root: SERVICE_KEYS.recipe,

  async findMany(
    queryParams: IGetRecipesQueryParameters
  ): Promise<IInfiniteScrollResponse<Recipe>> {
    const { typeId, holidayId, nationalCuisineId, cursor, take, title } =
      queryParams;

    const urlSearchParams = new URLSearchParams();

    if (typeId) urlSearchParams.append('typeId', typeId.toString());
    if (holidayId) urlSearchParams.append('holidayId', holidayId.toString());
    if (nationalCuisineId)
      urlSearchParams.append('nationalCuisineId', nationalCuisineId.toString());
    if (cursor) urlSearchParams.append('cursor', cursor.toString());
    if (take) urlSearchParams.append('take', take.toString());
    if (title) urlSearchParams.append('title', title.toString());

    return (await this.axios.get(`${this.root}?${urlSearchParams.toString()}`))
      .data;
  },

  async findOne(recipeId: number): Promise<Recipe> {
    return await this.axios.get(`${this.root}/${recipeId}`);
  },

  // async findSelection(
  //   queryParams: IGetRecipesQueryParameters
  // ): Promise<InfiniteScrollRecipeSelectionResponse> {
  //   const { typeId, holidayId, nationalCuisineId, cursor, take, title } =
  //     queryParams;

  //   const urlSearchParams = new URLSearchParams();

  //   if (typeId) urlSearchParams.append('typeId', typeId.toString());
  //   if (holidayId) urlSearchParams.append('holidayId', holidayId.toString());
  //   if (nationalCuisineId)
  //     urlSearchParams.append('nationalCuisineId', nationalCuisineId.toString());
  //   if (cursor) urlSearchParams.append('cursor', cursor.toString());
  //   if (take) urlSearchParams.append('take', take.toString());
  //   if (title) urlSearchParams.append('title', title.toString());
  //   return (
  //     await this.axios.get(
  //       `${this.root}/${SERVICE_KEYS.selection}?${urlSearchParams.toString()}`
  //     )
  //   ).data;
  // },
};
