import { Characteristics, IItemsPaginationResponse } from 'interfaces';
import { ICharacteristic, IGetCharacteristicsQueryParameters, QUERY_KEYS, SERVICE_KEYS } from '@/shared';
import { instance } from '../../api.instance';

const axios = instance;

const root = SERVICE_KEYS.characteristics

export const findMany = async ({
  type,
  ...query
}: {
  type: Characteristics;
} & IGetCharacteristicsQueryParameters): Promise<IItemsPaginationResponse<ICharacteristic>> => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    params.append(key, value.toString());
  });

  return (await axios.get(`${type}?${params.toString()}`)).data;
};


export const findRandom = async ({
  type,
}: {
  type: Characteristics;
}): Promise<ICharacteristic> => {
  const urlSearchParams = new URLSearchParams();
  if (type) urlSearchParams.append('type', type);

  return (
    await axios.get(
      `${root}/${QUERY_KEYS.random}?${urlSearchParams.toString()}`
    )
  ).data;
};