import { IAuthResponse } from '@/interfaces*';
import { instance, SERVICE_KEYS, QUERY_KEYS, ISignIn } from '@/shared*';

const axios = instance;

const root = SERVICE_KEYS.auth;

export async function signin(data: ISignIn): Promise<IAuthResponse> {
  console.log("hello")
  return (await axios.post(`/${root}/${QUERY_KEYS.signin}`, data))
    .data;
}
