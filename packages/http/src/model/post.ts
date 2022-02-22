import type { AxiosInstance } from "axios";
import type { ServerOptions } from "../types";
import { _request } from "./request";

export function _post<Res, Req>(
  $instance: AxiosInstance,
  url: string,
  options: ServerOptions = {}
) {
  return _request<Res, Req>($instance, url, {
    ...options,
    data: options.data,
  });
}
