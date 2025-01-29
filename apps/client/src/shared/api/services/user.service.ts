import { QUERY_KEYS } from '../../model/constants';
import { instance } from '../api.instance';
import { IUserResponse } from '../../../../../../interfaces';

export const userService = {
  axios: instance,

  async index(): Promise<IUserResponse> {
    return await (await this.axios.get(`${QUERY_KEYS.user}`)).data;
  },
};
