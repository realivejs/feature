import { RESPONSE_STATUS } from "../constants";

/**
 * @description 检查http status是否成功
 * @param {number} status httpstatus
 * @returns {boolean}
 */
export function checkStatusSuccess(status: number): boolean {
  return (
    RESPONSE_STATUS.STATUS_SUCCESS_MIN_STATUS >= status &&
    status <= RESPONSE_STATUS.STATUS_SUCCESS_MAX_STATUS
  );
}
