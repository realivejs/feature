import type { AxiosInstance } from "axios";
import type { ServerOptions } from "https";
import { _get, _post } from "./model";

export class RequestModel {
  constructor(public instance: AxiosInstance) {}

  /**
   * @description 获取axios实例
   * @returns {AxiosInstance}
   */
  getInstance() {
    return this.instance;
  }

  /**
   * @description post
   * @param {string} url
   * @param {Req} data
   * @param {ServerOptions} options
   * @returns {Res}
   */
  post<Res = unknown, Req = unknown>(
    url: string,
    data = {} as Req,
    options?: ServerOptions
  ) {
    return _post<Res, Req>(this.instance, url, {
      data,
      ...options,
    });
  }

  /**
   * @description get
   * @param {string} url
   * @param {Req} data
   * @param {ServerOptions} options
   * @returns {Res}
   */
  get<Res = unknown, Req = unknown>(
    url: string,
    data = {} as Req,
    options?: ServerOptions
  ) {
    return _get<Res, Req>(this.instance, url, {
      params: data,
      ...options,
    });
  }
}
