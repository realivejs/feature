import type { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

export interface EnhanceOptions {
  progress?: {
    open?: () => void;
    close?: () => void;
    error?: () => void;
  };
  message?: {
    open?: (message: string) => void;
    close?: () => void;
    error?: (message: string) => void;
  };
  messageSilence?: boolean;
  progressSlience?: boolean;
  useBuiltInInterceptor?: boolean;
  enhanceAxios?: (axios: Axios) => void;
  handleServerResponse?: <T>() => T;
  dataKey?: string;
}

export interface ServerOptions extends AxiosRequestConfig {
  enhanceOptions?: EnhanceOptions;
}

export interface ExpectJsonData<T> {
  code: string | number;
  message: string;
  data?: T;
  datas?: T;
  [key: string]: unknown;
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
