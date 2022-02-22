import type { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ServerOptions extends AxiosRequestConfig {
  enhanceOptions?: {
    progress?: {
      open: () => void;
      close: () => void;
      error: () => void;
    };
    message?: {
      open: (message: string) => void;
      close: () => void;
      error: (message: string) => void;
    };
    enhanceAxios?: (axios: Axios) => void;
  };
}

export interface ExpectJsonData<T> {
  code: string | number;
  message: string;
  data: T;
}

export interface PossiblyErrorData
  extends ExpectJsonData<{ "WEC-HASLOGIN": boolean }> {}

export interface EnhanceReponse<T = any, R = any> extends ExpectJsonData<T> {
  isOK: boolean;
  axiosResponse: AxiosResponse<ExpectJsonData<T>, R>;
  isCancel?: boolean;
  message: string;
  error?: unknown;
}

export type WrapAxiosResponse<T = any> = AxiosResponse<ExpectJsonData<T>>;
