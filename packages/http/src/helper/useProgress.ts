import type { ServerOptions } from "../types";

function noop() {}

export function useProgress(options: ServerOptions = {}) {
  const { enhanceOptions } = options;

  return {
    openProgress: enhanceOptions?.progress?.open || noop,
    closeProgress: enhanceOptions?.progress?.close || noop,
    errorProgress: enhanceOptions?.progress?.error || noop,
  };
}
