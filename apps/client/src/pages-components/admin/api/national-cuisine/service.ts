import { IItemsPaginationResponse } from "@/interfaces*";
import { SERVICE_KEYS, IGetCharacteristicsQueryParameters,instance } from "@/shared*";
import { NationalCuisine, Prisma } from "@prisma/client";
import { Type } from "typescript";

export const nationalCuisineService = {
  root: SERVICE_KEYS['national-cuisines'],

  axios: instance,

  async findMany(
    query: IGetCharacteristicsQueryParameters
  ): Promise<IItemsPaginationResponse<NationalCuisine>> {
    const urlSearchParams = new URLSearchParams();

    if (query.title) urlSearchParams.append('title', query.title);

    if (query.page === 0 ? true : query.page)
      urlSearchParams.append('page', (query.page + 1).toString());

    if (query.limit) urlSearchParams.append('limit', query.limit.toString());

    return (await this.axios.get(`${this.root}?${urlSearchParams.toString()}`))
      .data;
  },

  async createOne(dto: Prisma.NationalCuisineCreateInput): Promise<Type> {
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

  async deleteMany(ids: string[]): Promise<void> {
    const queryParameters = new URLSearchParams();

    ids.forEach((id) => queryParameters.append('id', id.toString()));
    return await this.axios.delete(
      `${this.root}?${queryParameters.toString()}`
    );
  },
};
