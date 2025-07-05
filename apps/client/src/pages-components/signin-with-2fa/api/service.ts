import { IAuthResponse, IStandardResponse } from '@/interfaces*';
import { instance, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { SigninWithTwoFaDto } from '../model/types/signin-with-two-fa.dto';

export function index(dto: SigninWithTwoFaDto): Promise<IStandardResponse<IAuthResponse>> {
  return instance.post(
    `${SERVICE_KEYS.auth}/${QUERY_KEYS['2fa']}/${QUERY_KEYS.signin}`,
    dto
  );
}
