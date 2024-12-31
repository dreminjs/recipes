import { QUERY_KEYS } from '../../model/constants';
import { instance } from '../api.instance';

import { Holiday, Prisma } from 'prisma/prisma-client';

export const holidayService = {
  root: QUERY_KEYS.holiday,

  axios: instance,

  async findMany() {
    return await this.axios.get(`${this.root}`);
  },

  async createOne(
    dto: Prisma.HolidayCreateInput
  ): Promise<Holiday> {
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
