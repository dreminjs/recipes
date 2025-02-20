import { IItemsPaginationResponse } from "@/interfaces*";
import { SERVICE_KEYS, IGetCharacteristicsQueryParameters, instance } from "@/shared*";
import { Prisma,Type } from "prisma/prisma-client";

export const typeService = {
  root: SERVICE_KEYS.type,

  axios: instance,

  async findMany(
    query: IGetCharacteristicsQueryParameters
  ): Promise<IItemsPaginationResponse<Type>> {
    const urlSearchParams = new URLSearchParams();

    if (query.title) urlSearchParams.append('title', query.title);

    if (query.page === 0 ? true : query.page)
      urlSearchParams.append('page', (query.page + 1).toString());

    if (query.limit) urlSearchParams.append('limit', query.limit.toString());

    return (await this.axios.get(`${this.root}?${urlSearchParams.toString()}`))
      .data;
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

  async deleteMany(ids: string[]): Promise<void> {
    const queryParameters = new URLSearchParams();

    ids.forEach((id) => queryParameters.append('id', id.toString()));

    await this.axios.delete(`${this.root}?${queryParameters.toString()}`);
  },
};
