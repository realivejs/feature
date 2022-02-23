import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { RESPONSE_CODE } from "../constants";
import { isString, isError, useMessage, useProgress } from "../helper";
import type { PossiblyErrorData, ServerOptions } from "../types";

type ResponseIntercept = "response";
type RequestIntercept = "request";
type InterceptorType = ResponseIntercept | RequestIntercept;

type InterceptResult<T> = T extends ResponseIntercept
  ? AxiosResponse
  : T extends RequestIntercept
  ? AxiosRequestConfig
  : unknown;

type InterceptResolve<T> = (res: InterceptResult<T>) => InterceptResult<T>;
type InterceptReject = (err: unknown) => void;

/**
 * @description 绑定拦截器
 * @param {AxiosInstance} instance
 * @param {InterceptorType} type
 * @param {InterceptResolve}resolver
 * @returns {void}
 */
function bindInterceptor<T extends InterceptorType>(
  instance: AxiosInstance,
  type: T,
  resolver: InterceptResolve<T>,
  rejector?: InterceptReject
) {
  instance.interceptors[type].use(
    (result) => resolver(result as InterceptResult<T>),
    rejector
  );
}

/**
 * @description 监听业务错误
 * @param {AxiosResponse} response
 * @returns {void}
 */
function handleDataError(
  response: AxiosResponse<PossiblyErrorData>,
  messageHandler: ReturnType<typeof useMessage>,
  progressHandler: ReturnType<typeof useProgress>
) {
  const { data: axiosData } = response;
  // 业务返回response是否存在
  if (axiosData) {
    const { data, code, message } = axiosData;

    switch (true) {
      // 特殊错误捕获
      case !!data?.["WEC-HASLOGIN"] === false:
        progressHandler.error();
        messageHandler.error("登陆信息失效，请重新登陆");
        break;

      // 这个不知道是什么报错
      case RESPONSE_CODE.LOGOUT_ERROR === code:
        progressHandler.error();
        messageHandler.error(`${code} - ${message}`);
        return;

      // 业务错误
      case RESPONSE_CODE.BUS_SUCCESS !== code:
        progressHandler.error();
        messageHandler.error(message);
        return;

      default:
        progressHandler.close();
        messageHandler.close();
    }
  } else {
    progressHandler.error();
    messageHandler.close();
  }
}

/**
 * @description 使用拦截器
 * @param {AxiosInstance} instance
 * @param {ServerOptions} options
 * @returns {void}
 */
export function useInterceptor(
  instance: AxiosInstance,
  options: ServerOptions = {}
) {
  const { enhanceOptions } = options;
  const messageHandler = useMessage(options);
  const progressHandler = useProgress(options);

  console.log("useInterceptor", options);

  bindInterceptor(instance, "request", (request) => {
    progressHandler.open();
    return request;
  });

  bindInterceptor(
    instance,
    "response",
    (response) => {
      if (enhanceOptions?.useBuiltInInterceptor) {
        handleDataError(response, messageHandler, progressHandler);
      }

      return response;
    },
    (err) => {
      messageHandler.close();

      if (axios.isCancel(err)) {
        progressHandler.close();
      } else {
        progressHandler.error();
      }

      if (isString(err)) {
        messageHandler.error(err);
      }

      if (isError(err)) {
        messageHandler.error(err.message);
      }

      throw err;
    }
  );
}
