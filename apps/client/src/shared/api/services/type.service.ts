import { InfiniteScrollResponse } from 'interfaces';
import { QUERY_KEYS } from '../../model/constants';
import { IGetCharacteristicsQueryParameters } from '../../model/interfaces/characteristic.interface';
import { instance } from '../api.instance';

import { Prisma, Type } from 'prisma/prisma-client';

export const typeService = {
  root: QUERY_KEYS.type,

  axios: instance,

  async findMany(
    query: IGetCharacteristicsQueryParameters
  ): Promise<InfiniteScrollResponse<Type>> {
    const urlSearchParams = new URLSearchParams();

    if (query.title) urlSearchParams.append('title', query.title);

    if (query.cursor) urlSearchParams.append('cursor', query.cursor.toString());

    if (query.limit) urlSearchParams.append('limit', query.limit.toString());

    return (await this.axios.get(`${this.root}?${urlSearchParams.toString()}`)).data
  },

  async createOne(dto: Prisma.TypeCreateInput): Promise<Type> {
    return await this.axios.post(`${this.root}`, dto);
  },

  async updateOne(
    where: Prisma.TypeWhereUniqueInput,
    dto: Prisma.TypeUpdateInput
  ): Promise<Type> {
    return await this.axios.put(`${this.root}/${where.id}`, dto);
  },

  async deleteOne(where: Prisma.TypeWhereUniqueInput) {
    return await this.axios.delete(`${this.root}/${where.id}`);
  },
};
