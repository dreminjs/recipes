import { Ingredient, Prisma } from 'prisma/prisma-client';
import { QUERY_KEYS } from '../../model/constants';
import { instance } from '../api.instance';
import { InfiniteScrollResponse } from 'interfaces';
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
  ): Promise<InfiniteScrollResponse<Ingredient>> {
    const urlSearchParams = new URLSearchParams();

    if (query.title) urlSearchParams.append('title', query.title);

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
