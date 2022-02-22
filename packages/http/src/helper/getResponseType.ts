import { RESPONSE_TYPE } from "../constants";

const isJson = (value?: unknown): value is object => {
  return (
    value !== null &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
};

/**
 * @description 获取服务器返回数据类型
 * @param {AxiosResponse} response
 */
export function getResponseType<T>(data: T) {
  switch (true) {
    case isJson(data):
      return RESPONSE_TYPE.JSON;

    default:
      return RESPONSE_TYPE.NONE;
  }
}
