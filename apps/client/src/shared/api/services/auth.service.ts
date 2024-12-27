import { IAuthResponse } from 'interfaces';
import { instance } from '../api.instance';
import { ISignIn, ISignUp, QUERY_KEYS, SERVICE_KEYS } from '../..';

export const AuthService = {

  axios: instance,

  async signup(data:ISignUp): Promise<IAuthResponse> {
    return (await this.axios.post(`/${SERVICE_KEYS.auth}/${QUERY_KEYS.signup}`,data)).data
  },

  async signin(data:ISignIn): Promise<IAuthResponse> {
    return await this.axios.post(`${SERVICE_KEYS.auth}/${QUERY_KEYS.signin}`,data)
  },
};
