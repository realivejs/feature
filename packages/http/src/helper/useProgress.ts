import type { EnhanceOptions, ServerOptions } from "../types";

function noop() {}

type ProgressHandler = Required<Required<EnhanceOptions>["progress"]>;

export function useProgress(options: ServerOptions = {}): ProgressHandler {
  const { enhanceOptions } = options;

  if (enhanceOptions?.progressSlience) {
    return {
      open: noop,
      close: noop,
      error: noop,
    };
  }

  return {
    open: enhanceOptions?.progress?.open || noop,
    close: enhanceOptions?.progress?.close || noop,
    error: enhanceOptions?.progress?.error || noop,
  };
}
