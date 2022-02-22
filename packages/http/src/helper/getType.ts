/**
 * @description 判断value是否为string类型
 * @param {unknown} value
 * @returns {boolean}
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}
