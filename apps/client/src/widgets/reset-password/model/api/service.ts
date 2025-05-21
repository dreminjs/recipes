import { instance, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { IRequestResetPasswordForm, IResetPasswordDto } from '../inteface';
import { IStandardResponse } from '@/interfaces*';

export const requestResetPassword = async (data: IRequestResetPasswordForm): Promise<IStandardResponse> => {
  return await instance.post(
    `${SERVICE_KEYS.auth}/${QUERY_KEYS['request-reset-password']}`,
    data
  )
};

export const resetPassword = async (data: IResetPasswordDto): Promise<IStandardResponse> => {
  return await instance.post(
    `${SERVICE_KEYS.auth}/${QUERY_KEYS['reset-password']}`,
    data
  )
};


