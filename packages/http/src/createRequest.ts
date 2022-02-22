import type { ServerOptions } from "./types";
import { createServer } from "./createServer";
import { RequestModel } from "./RequestModel";
import { useInterceptor } from "./interceptor";

/**
 * @description 创建请求
 * @param {ServerOptions} options
 * @returns {Request}
 */
export function createRequest(options: ServerOptions = {}) {
  const $instance = createServer(options);

  useInterceptor($instance, options);

  return new RequestModel($instance);
}
