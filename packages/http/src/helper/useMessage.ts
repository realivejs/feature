import type { EnhanceOptions, ServerOptions } from "../types";

function noop() {}

type MessageHandler = Required<Required<EnhanceOptions>["message"]>;

export function useMessage(options: ServerOptions = {}): MessageHandler {
  const { enhanceOptions } = options;

  if (enhanceOptions?.messageSilence) {
    return {
      open: noop,
      close: noop,
      error: noop,
    };
  }

  return {
    open: enhanceOptions?.message?.open || noop,
    close: enhanceOptions?.message?.close || noop,
    error: enhanceOptions?.message?.error || noop,
  };
}
