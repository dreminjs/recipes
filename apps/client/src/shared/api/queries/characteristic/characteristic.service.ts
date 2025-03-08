import { Characteristics, ICharacteristic } from '@/interfaces';
import { QUERY_KEYS, SERVICE_KEYS } from '@/shared';
import { instance } from '../../api.instance';

const root = SERVICE_KEYS.characteristics;

const axios = instance;
export const findRandom = async ({
  type,
}: {
  type: Characteristics;
}): Promise<ICharacteristic> => {
  const urlSearchParams = new URLSearchParams();
  // if (dto.limit) urlSearchParams.append('limit', dto.limit.toString());
  // if (dto.cursor) urlSearchParams.append('cursor', dto.cursor.toString());
  // if (dto.isType) urlSearchParams.append('isType', dto.isType.toString());
  // if (dto.isNationalCuisine)
  //   urlSearchParams.append(
  //     'isNationalCuisine',
  //     dto.isNationalCuisine.toString()
  //   );
  // if (dto.isHoliday)
  //   urlSearchParams.append('isHoliday', dto.isHoliday.toString());

  if (type) urlSearchParams.append('type', type);

  return (
    await axios.get(
      `${root}/${QUERY_KEYS.random}?${urlSearchParams.toString()}`
    )
  ).data;
};
