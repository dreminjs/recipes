import { Recipe } from 'prisma/prisma-client';
import { QUERY_KEYS, SERVICE_KEYS } from '../../model/constants';
import { IGetRecipesQueryParameters } from '../../model/interfaces/recipe.interface';
import { instance } from '../api.instance';
import { InfiniteScrollResponse } from 'interfaces';

export const recipeService = {
  axios: instance,

  root: `${QUERY_KEYS.recipe}`,

  async findMany(queryParams: IGetRecipesQueryParameters): Promise<InfiniteScrollResponse<Recipe>> {
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

    return await this.axios.get(`${this.root}?${urlSearchParams.toString()}`);
  },

  // async findOne(recipeId: number) {
  //   return await this.axios.get(`${this.root}/${SERVICE_KEYS.selection}/${recipeId}`);
  // },

  async findSelection() {
    return await this.axios.get(`${this.root}/${SERVICE_KEYS.selection}`);
  }
};
