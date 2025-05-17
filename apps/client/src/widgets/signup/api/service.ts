import { IAuthResponse } from '@/interfaces*';
import { instance, SERVICE_KEYS, QUERY_KEYS, ISignUp } from '@/shared*';

const axios = instance;

const root = SERVICE_KEYS.auth;

export async function signup(data: ISignUp): Promise<any> {
  const response = (await axios.post(`/${root}/${QUERY_KEYS.signup}`, data))
  console.log(response)
    
  return response
}
