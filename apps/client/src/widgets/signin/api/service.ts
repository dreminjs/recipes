import { IAuthResponse } from '@/interfaces*';
import { instance, SERVICE_KEYS, QUERY_KEYS, ISignIn } from '@/shared*';

const axios = instance;

const root = SERVICE_KEYS.auth;

const queryKeys = QUERY_KEYS;

export async function signin(data: ISignIn): Promise<IAuthResponse> {
  return (await axios.post(`/${root}/${queryKeys.signin}`, data))
    .data;
}
