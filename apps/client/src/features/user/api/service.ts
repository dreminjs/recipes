import { IStandardResponse } from '@/interfaces*';
import { instance, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';

export const sendEnableTwoFaRequest = async (): Promise<IStandardResponse> => {
  return (await instance.post(
    `${SERVICE_KEYS.auth}/${QUERY_KEYS['2fa']}/enable/request`
  )).data
};

export const sendDisableTwoFaRequest = async (): Promise<IStandardResponse> => {
  return (await instance.post(
    `${SERVICE_KEYS.auth}/${QUERY_KEYS['2fa']}/disable/request`
  )).data
};
