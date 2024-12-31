import { QUERY_KEYS } from '../../model/constants';
import { instance } from '../api.instance';

import { NationalCuisine, Prisma } from 'prisma/prisma-client';

export const nationalCuisineService = {
  root: QUERY_KEYS.nationalCuisine,

  axios: instance,

  async findMany() {
    return await this.axios.get(`${this.root}`);
  },

  async createOne(
    dto: Prisma.NationalCuisineCreateInput
  ): Promise<NationalCuisine> {
    return await this.axios.post(`${this.root}`, dto);
  },

  async updateOne(
    where: Prisma.NationalCuisineWhereUniqueInput,
    dto: Prisma.NationalCuisineUpdateInput
  ): Promise<NationalCuisine> {
    return await this.axios.put(`${this.root}/${where.id}`, dto);
  },

  async deleteOne(where: Prisma.NationalCuisineWhereUniqueInput) {
    return await this.axios.delete(`${this.root}/${where.id}`);
  },
};
