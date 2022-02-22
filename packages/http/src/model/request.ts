import type { AxiosInstance, AxiosResponse } from "axios";
import type { EnhanceReponse, ServerOptions } from "../types";
import { getResponse } from "../helper/createResponse";
import axios from "axios";

export async function _request<Res, Req>(
  instance: AxiosInstance,
  url: string,
  options: ServerOptions = {}
) {
  return new Promise<EnhanceReponse<Res, Req>>((resolve) => {
    instance
      .request({
        url,
        ...options,
      })
      .then((response) => {
        resolve(getResponse(response));
      })
      .catch((err) => {
        const { response } = (err as { response: AxiosResponse }) || {};

        resolve(getResponse(response || {}, axios.isCancel(err)));
      });
  });
}
