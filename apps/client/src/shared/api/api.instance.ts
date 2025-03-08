import { API_URL } from "../model/constants";
import axios from "axios";
import errorCatch from "./api.error";


export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


let retryCount = 0

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired ' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry &&
			retryCount < 2
		) {
			originalRequest._isRetry = true
			retryCount += 1
			try {
				return instance.get("tokens")
			} catch (error: any) {
				if (errorCatch(error) === 'jwt expired') {
					// set auth false
				}
			}
		}

		throw error
	}
)