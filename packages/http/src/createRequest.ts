import type { ServerOptions } from "./types";
import { createAxios } from "./createAxios";
import { RequestModel } from "./model";
import { getDefaultOptions } from "./helper";

/**
 * @description 创建请求
 * @param {ServerOptions} options
 * @returns {Request}
 */
export function createRequest(options: ServerOptions = {}) {
  const $instance = createAxios(options);
  const _options = getDefaultOptions(options);

  const { enhanceOptions } = _options;

  if (enhanceOptions) {
    const { enhanceAxios } = enhanceOptions;
    enhanceAxios?.($instance);
  }

  return new RequestModel($instance, _options);
}
