import type { AxiosInstance, AxiosResponse } from "axios";
import type { ServerOptions, EnhanceReponse } from "../types";
import { getResponse } from "../helper/createResponse";
import axios from "axios";
import { useInterceptor } from "../helper";

let isAddInterceptor = false;

export async function _request<Res, Req>(
  instance: AxiosInstance,
  url: string,
  options: ServerOptions = {}
) {
  if (!isAddInterceptor) {
    isAddInterceptor = useInterceptor(instance, options);
  }

  return new Promise<EnhanceReponse<Res, Req>>((resolve) => {
    instance
      .request({
        url,
        ...options,
      })
      .then((response) => {
        resolve(getResponse(response, options));
      })
      .catch((err) => {
        const { response } = (err as { response: AxiosResponse }) || {};

        resolve(getResponse(response || {}, options, axios.isCancel(err)));
      });
  });
}
