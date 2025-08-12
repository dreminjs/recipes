import { AxiosError } from "axios";

export interface ApiOperationState<TError = AxiosError<IErrorResponse>> {
  isSuccess: boolean;
  isError: boolean;
  isPending: boolean;
  error: TError | null;
}

export interface IErrorResponse {
  error: string
  message: string
  statusCode: number
}
