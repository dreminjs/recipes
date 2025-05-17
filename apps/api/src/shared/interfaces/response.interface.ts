


export interface IStandardResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: {
      code: string;
      details?: any;
    };
  }