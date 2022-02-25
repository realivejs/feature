import { isNil } from "./common";
import type { EnhanceOptions, ServerOptions } from "../types";

/**
 * @description 获取默认的serverOptions
 * @param {ServerOptions} options
 * @returns {ServerOptions}
 */
export function getDefaultOptions(options: ServerOptions): ServerOptions {
  const { enhanceOptions } = options;

  const message = enhanceOptions?.message || ({} as EnhanceOptions["message"]);

  const progress =
    enhanceOptions?.progress || ({} as EnhanceOptions["progress"]);

  const useBuiltInInterceptor = isNil(enhanceOptions?.useBuiltInInterceptor)
    ? true
    : (enhanceOptions?.useBuiltInInterceptor as boolean);

  const messageSilence = isNil(enhanceOptions?.messageSilence)
    ? false
    : (enhanceOptions?.messageSilence as boolean);

  const progressSlience = isNil(enhanceOptions?.progressSlience)
    ? false
    : (enhanceOptions?.progressSlience as boolean);

  return {
    enhanceOptions: {
      messageSilence,
      progressSlience,
      enhanceAxios: enhanceOptions?.enhanceAxios,
      message,
      progress,
      useBuiltInInterceptor,
    },
  };
}
