import { QUERY_KEYS, SERVICE_KEYS } from '../../../model/constants';
import { instance } from '../../api.instance';
import { IUserResponse } from 'interfaces';

export const userService = {
  axios: instance,
  root: SERVICE_KEYS.user,
  queryKeys: QUERY_KEYS,

  async index(): Promise<IUserResponse> {
    return await (
      await this.axios.get(`${this.root}`)
    ).data;
  },
};
