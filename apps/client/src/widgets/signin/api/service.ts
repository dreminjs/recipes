import { IAuthResponse } from "@/interfaces*";
import { instance, SERVICE_KEYS, QUERY_KEYS, ISignIn } from "@/shared*";

export const AuthService = {
  axios: instance,

  root: SERVICE_KEYS.auth,

  queryKeys: QUERY_KEYS,

  async signin(data: ISignIn): Promise<IAuthResponse> {
    return (
      await this.axios.post(`/${this.root}/${this.queryKeys.signin}`, data)
    ).data;
  },
};
