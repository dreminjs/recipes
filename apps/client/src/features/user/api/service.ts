import { IUserResponse } from '@/interfaces*';
import { instance, SERVICE_KEYS } from '@/shared*';

const root = SERVICE_KEYS.users;

export const findMySelf = async (): Promise<IUserResponse> => {
  return await (
    await instance.get(`${root}`)
  ).data;
};
