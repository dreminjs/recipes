import { IAuthResponse } from "@/interfaces*";
import { instance, SERVICE_KEYS, QUERY_KEYS, ISignUp } from "@/shared*";

export const AuthService = {
  axios: instance,

  root: SERVICE_KEYS.auth,

  queryKeys: QUERY_KEYS,

  async signup(data: ISignUp): Promise<IAuthResponse> {
    return (
      await this.axios.post(`/${this.root}/${this.queryKeys.signup}`, data)
    ).data;
  },
};
