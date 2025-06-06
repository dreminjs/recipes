import { IAuthResponse, IStandardResponse } from '@/interfaces*';
import { instance, SERVICE_KEYS, QUERY_KEYS, ISignUp, ISignIn } from '@/shared*';

const axios = instance;

const root = SERVICE_KEYS.auth;

export async function signup(data: ISignUp): Promise<IStandardResponse> {
  return (await axios.post(`/${root}/${QUERY_KEYS.signup}`, data)).data
}

export async function signin(data: ISignIn): Promise<IStandardResponse<IAuthResponse>> {
  return (await axios.post(`/${root}/${QUERY_KEYS.signin}`, data))
    .data;
}
