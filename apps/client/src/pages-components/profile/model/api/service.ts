import { instance, QUERY_KEYS, SERVICE_KEYS } from '@/shared*';
import { User } from '@prisma/client';

const root = SERVICE_KEYS.users;

const ME = QUERY_KEYS.me

export const findMySelf = async (): Promise<User> => {
  return await (
    await instance.get(`${root}/${ME}`)
  ).data;
};
