import { instance, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { IResetPasswordForm } from '../inteface';

export const requestResetPassword = async (data: IResetPasswordForm) => {
  return await instance.post(
    `${SERVICE_KEYS.auth}/${QUERY_KEYS['request-reset-password']}`,
    data
  );
};
