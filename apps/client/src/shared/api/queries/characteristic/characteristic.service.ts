import { Characteristics, ICharacteristic } from '@/interfaces';
import { SERVICE_KEYS } from '@/shared';
import { instance } from '../../api.instance';

export const characteristicService = {
  root: SERVICE_KEYS.characteristic,

  axios: instance,

  async findRandom({type}:{type: Characteristics}): Promise<ICharacteristic> {
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

    if(type) urlSearchParams.append("type",type)

    return (await this.axios.get(`${this.root}/${SERVICE_KEYS.random}?${urlSearchParams.toString()}`)).data
  },
};
