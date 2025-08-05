import { instance, QUERY_KEYS, SERVICE_KEYS } from "@/shared/"

export const logout = () => {
    return instance.delete(`${SERVICE_KEYS.auth}/${QUERY_KEYS.signout}`)
}