import { User } from 'prisma/prisma-client';
import { QUERY_KEYS } from '../../model/constants';
import { instance } from '../api.instance';

export const userService = {
  axios: instance,

  async index(): Promise<User> {
    return await (await this.axios.get(`${QUERY_KEYS.user}`)).data;
  },
};
