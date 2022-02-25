import type { AxiosInstance } from "axios";
import type { ServerOptions } from "../types";
import { _get } from "./_get";
import { _post } from "./_post";
import { isEmptyObject } from "../helper";

export class RequestModel {
  constructor(
    private instance: AxiosInstance,
    private rootOptions: ServerOptions
  ) {}

  /**
   * @description 获取axios实例
   * @returns {AxiosInstance}
   */
  getInstance() {
    return this.instance;
  }

  /**
   * @description 合并options
   * @param {ServerOptions} options
   * @returns {ServerOptions}
   */
  private mergeOptions(options: ServerOptions = {}) {
    if (isEmptyObject(options)) {
      return this.rootOptions;
    } else {
      // 如果存在options属性，传入的options覆盖rootOptions
      const { enhanceOptions: _rootEhanceOptions, ..._rootAxiosOptions } =
        this.rootOptions;

      const { enhanceOptions: _enhanceOptions, ..._axiosOptions } = options;

      const axiosOptions = { ..._rootAxiosOptions, ..._axiosOptions };
      const enhanceOptions = { ..._rootEhanceOptions, ..._enhanceOptions };

      return {
        ...axiosOptions,
        enhanceOptions,
      };
    }
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
    const mergeOptions = this.mergeOptions(options);

    return _post<Res, Req>(this.instance, url, {
      data,
      ...mergeOptions,
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
    const mergeOptions = this.mergeOptions(options);

    return _get<Res, Req>(this.instance, url, {
      params: data,
      ...mergeOptions,
    });
  }
}
