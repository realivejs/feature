import type { ServerOptions } from "../types";

function noop() {}

export function useMessage(options: ServerOptions = {}) {
  const { enhanceOptions } = options;

  return {
    openMessage: enhanceOptions?.message?.open || noop,
    closeMessage: enhanceOptions?.message?.close || noop,
    errorMessage: enhanceOptions?.message?.error || noop,
  };
}
