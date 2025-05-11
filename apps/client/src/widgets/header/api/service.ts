import { instance, QUERY_KEYS, SERVICE_KEYS } from "@/shared*"

export const logout = () => {
    return instance.delete(`${QUERY_KEYS.auth}/${SERVICE_KEYS.signout}`)
}