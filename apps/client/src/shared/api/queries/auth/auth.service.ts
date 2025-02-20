import { IAuthResponse } from '@/interfaces';
import { instance } from '../../api.instance';
import { ISignIn, ISignUp, QUERY_KEYS, SERVICE_KEYS } from '../../..';

export const AuthService = {
  axios: instance,

  root: SERVICE_KEYS.auth,

  queryKeys: QUERY_KEYS,

  async signup(data: ISignUp): Promise<IAuthResponse> {
    return (
      await this.axios.post(`/${this.root}/${this.queryKeys.signup}`, data)
    ).data;
  },

  async signin(data: ISignIn): Promise<IAuthResponse> {
    return await this.axios.post(
      `${this.root}/${this.queryKeys.signup}`,
      data
    ).then(res => res.data)
  },
};
