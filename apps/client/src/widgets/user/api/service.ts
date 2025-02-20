import { IUserResponse } from "@/interfaces*";
import { instance, SERVICE_KEYS, QUERY_KEYS } from "@/shared*";

export const userService = {
  axios: instance,
  root: SERVICE_KEYS.user,
  queryKeys: QUERY_KEYS,

  async index(): Promise<IUserResponse> {
    return await (
      await this.axios.get(`${this.root}`)
    ).data;
  },
};
