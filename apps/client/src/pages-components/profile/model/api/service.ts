import { IUserResponse } from '@/interfaces*';
import { instance, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';

const root = SERVICE_KEYS.users;

const ME = QUERY_KEYS.me

export const findMySelf = async (): Promise<IUserResponse> => {
  return await (
    await instance.get(`${root}/${ME}`)
  ).data;
};
