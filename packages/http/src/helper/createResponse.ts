import type {
  EnhanceReponse,
  WrapAxiosResponse,
  ServerOptions,
  ExpectJsonData,
} from "../types";
import { RESPONSE_CODE, RESPONSE_TYPE } from "../constants";
import { getResponseType } from "./getResponseType";
import { checkStatusSuccess } from "./checkHttpStatus";
import { isUndefined } from ".";

/**
 * @description 创建通用response
 * @param {EnhanceReponse} data
 * @returns {EnhanceReponse}
 */
export function createResponse(response: EnhanceReponse): EnhanceReponse {
  return {
    code: response.code,
    data: response.data,
    message: response.message,
    axiosResponse: response.axiosResponse,
    error: response?.error || null,
    isOK: response.isOK,
    isCancel: response?.isCancel || false,
  };
}

/**
 * @description 获取服务端返回数据
 * @param params
 */
export function getServerData(
  serverData = {} as ExpectJsonData<unknown>,
  options: ServerOptions
): ExpectJsonData<unknown>["data"] {
  const { data, datas } = serverData;
  const { enhanceOptions = {} } = options;
  const { dataKey } = enhanceOptions;

  if (data) {
    return data;
  }

  if (datas) {
    return datas;
  }

  if (!isUndefined(dataKey)) {
    return serverData[dataKey] as ExpectJsonData<unknown>["data"];
  }

  return {};
}

/**
 * @description 根据传入axiosRepsonse对象获取响应
 * @param {WrapAxiosResponse} response
 * @param {boolean} isCancel
 * @returns {EnhanceReponse}
 */
export function getResponse(
  response = {} as WrapAxiosResponse,
  options: ServerOptions,
  isCancel?: boolean
): EnhanceReponse {
  if (!response || !response.data) {
    return createResponse({
      isOK: false,
      code: RESPONSE_CODE.HTTP_ERROR,
      data: undefined,
      message: "",
      isCancel,
      axiosResponse: response,
    });
  } else {
    // 获取响应类型
    const { code, message } = response.data;
    const data = getServerData(response.data, options);
    // 获取http状态码
    const { status } = response;
    const types = getResponseType(data);
    // 如果响应类型为json
    if (RESPONSE_TYPE.JSON === types) {
      return createResponse({
        isOK: RESPONSE_CODE.BUS_SUCCESS === code,
        code,
        data,
        message,
        isCancel,
        axiosResponse: response,
      });
    } else {
      // 非json类型，这里只对http status进行判断，如果在200 - 299之间算作成功
      const statusOk = checkStatusSuccess(status);

      return createResponse({
        isOK: statusOk,
        code: statusOk ? RESPONSE_CODE.BUS_SUCCESS : RESPONSE_CODE.HTTP_ERROR,
        data: statusOk ? data : undefined,
        message: "",
        isCancel,
        axiosResponse: response,
      });
    }
  }
}
