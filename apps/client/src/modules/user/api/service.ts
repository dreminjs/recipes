import { instance, SERVICE_KEYS, QUERY_KEYS } from '@/shared';
import { User } from '@prisma/client';
import { IStandardResponse } from 'interfaces';
import { IRequestResetPasswordForm, IResetPasswordDto } from '../modal/interface';

export const findMySelf = async (): Promise<User> => {
  return await (
    await instance.get(`${SERVICE_KEYS.users}/${QUERY_KEYS.me}`)
  ).data
};

export const resendEmailConfirmation = () =>
  instance.post(`${SERVICE_KEYS.mail}/${QUERY_KEYS.resend}`);

export const sendEnableTwoFaRequest = () =>
  instance.post(`${SERVICE_KEYS.auth}/${QUERY_KEYS['2fa']}/enable/request`);

export const sendDisableTwoFaRequest = () =>
  instance.post(`${SERVICE_KEYS.auth}/${QUERY_KEYS['2fa']}/disable/request`);

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


