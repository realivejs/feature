import axios from "axios";
import type { AxiosInstance } from "axios";
import type { ServerOptions } from "./types";

function wrapAxios(options: ServerOptions = {}) {
  const { enhanceOptions } = options;
  const $instance = axios.create(options);

  if (enhanceOptions) {
    const { enhanceAxios } = enhanceOptions;
    enhanceAxios?.($instance);
  }

  return $instance;
}

/**
 * @description 创建axios实例
 * @param {string} url
 * @param {options} {ServerOptions}
 * @returns {AxiosInstance}
 */
export function createServer(options: ServerOptions = {}): AxiosInstance {
  return wrapAxios(options);
}
