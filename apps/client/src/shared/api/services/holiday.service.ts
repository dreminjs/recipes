import { InfiniteScrollResponse } from 'interfaces';
import { QUERY_KEYS } from '../../model/constants';
import { instance } from '../api.instance';

import { Holiday, Prisma } from 'prisma/prisma-client';
import { IGetCharacteristicsQueryParameters } from '../../model/interfaces/characteristic.interface';

export const holidayService = {
  root: QUERY_KEYS.holiday,

  axios: instance,

  async findMany(
    query: IGetCharacteristicsQueryParameters
  ): Promise<InfiniteScrollResponse<Holiday>> {
    const urlSearchParams = new URLSearchParams();

    if (query.title) urlSearchParams.append('title', query.title);

    if (query.cursor) urlSearchParams.append('cursor', query.cursor.toString());

    if (query.limit) urlSearchParams.append('limit', query.limit.toString());

    return (await this.axios.get(`${this.root}?${urlSearchParams.toString()}`))
      .data;
  },

  async createOne(dto: Prisma.HolidayCreateInput): Promise<Holiday> {
    return await this.axios.post(`${this.root}`, dto);
  },

  async updateOne(
    where: Prisma.HolidayWhereUniqueInput,
    dto: Prisma.HolidayUpdateInput
  ): Promise<Holiday> {
    return await this.axios.put(`${this.root}/${where.id}`, dto);
  },

  async deleteOne(where: Prisma.HolidayWhereUniqueInput) {
    return await this.axios.delete(`${this.root}/${where.id}`);
  },
};
