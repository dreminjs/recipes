import {
  IGetCharacteristicsQueryParameters,
  instance,
  SERVICE_KEYS,
} from '@/shared';
import { Ingredient } from '@prisma/client';
import { IItemsPaginationResponse } from 'interfaces';

export const findMany = async (
  dto: IGetCharacteristicsQueryParameters
): Promise<IItemsPaginationResponse<Ingredient>> => {
  const queryParameters = new URLSearchParams();

  if (dto.title) {
    queryParameters.append('search', dto.title);
  }

  queryParameters.append('page', dto.page.toString());

  queryParameters.append('limit', dto.limit.toString());

  return (await instance.get(`${SERVICE_KEYS.ingredients}?${queryParameters.toString()}`)).data
};
