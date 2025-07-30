import { IAuthResponse, IStandardResponse } from '@/interfaces*';
import { instance, ISignIn, ISignUp, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { SigninWithTwoFaDto } from '../model/types/signin-with-two-fa.dto';

export function signinByTwoFa(dto: SigninWithTwoFaDto): Promise<IStandardResponse<IAuthResponse>> {
  return instance.post(
    `${SERVICE_KEYS.auth}/${QUERY_KEYS['2fa']}/${QUERY_KEYS.signin}`,
    dto
  );
}

export async function signup(data: ISignUp): Promise<IStandardResponse> {
  return (await instance.post(`/${SERVICE_KEYS.auth}/${QUERY_KEYS.signup}`, data)).data
}

export async function signin(data: ISignIn): Promise<IStandardResponse<IAuthResponse>> {
  return (await instance.post(`/${SERVICE_KEYS.auth}/${QUERY_KEYS.signin}`, data))
    .data;
}
