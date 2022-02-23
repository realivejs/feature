import type { AxiosInstance } from "axios";
import type { ServerOptions } from "../types";
import { _request } from "./_request";

export function _get<Res, Req>(
  $instance: AxiosInstance,
  url: string,
  options: ServerOptions = {}
) {
  return _request<Res, Req>($instance, url, {
    method: "get",
    params: options.params,
  });
}
