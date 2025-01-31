import { Ingredient, Prisma } from 'prisma/prisma-client';
import { QUERY_KEYS } from '../../model/constants';
import { instance } from '../api.instance';
import { IItemsPaginationResponse } from 'interfaces';
import { IGetCharacteristicsQueryParameters } from '../../model/interfaces/characteristic.interface';
import { IIngredientForm } from '../../model/interfaces/ingredient.interface';

export const ingredientService = {
  root: QUERY_KEYS.ingredient,

  axios: instance,

  async createOne(data: IIngredientForm): Promise<Ingredient> {
    return this.axios.post(`${this.root}`, data);
  },

  async findMany(
    query: IGetCharacteristicsQueryParameters
  ): Promise<IItemsPaginationResponse<Ingredient>> {
    const urlSearchParams = new URLSearchParams();

    if (query.title) urlSearchParams.append('title', query.title);
    
    if (query.page === 0 ? true : query.page)
      urlSearchParams.append('page', (query.page + 1).toString());

    if (query.limit) urlSearchParams.append('limit', query.limit.toString());

    return (await this.axios.get(`${this.root}?${urlSearchParams.toString()}`))
      .data;
  },

  async updateOne(
    where: Prisma.IngredientWhereUniqueInput,
    data: IIngredientForm
  ): Promise<Ingredient> {
    return this.axios.put(`${this.root}/${where.id}`, data);
  },

  async deleteOne(where: Prisma.IngredientWhereUniqueInput): Promise<void> {
    return this.axios.delete(`${this.root}/${where.id}`);
  },
};
