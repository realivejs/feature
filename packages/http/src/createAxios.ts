import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * @description 创建axios实例
 * @param {string} url
 * @param {options} ServerOptions
 * @returns {AxiosInstance}
 */
export function createAxios(options: AxiosRequestConfig): AxiosInstance {
  const $instance = axios.create(options || {});

  return $instance;
}
