/**
 * @description 判断value是否为string类型
 * @param {unknown} value
 * @returns {boolean}
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * @description 判断value是否为Error
 * @param {unknown} value
 * @returns {boolean}
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * @description 判断value是否为null
 * @param {unknown} value
 * @returns {boolean}
 */
export function isNull(value: unknown): value is null {
  return typeof value === "object" && value === null;
}

/**
 * @description 判断value是否为undefined
 * @param {unknown} value
 * @returns {boolean}
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined" && value === undefined;
}

/**
 * @description 判断value是否为undefined、null
 * @param {unknown} value
 * @returns {boolean}
 */
export function isNil(value: unknown) {
  return isNull(value) || isUndefined(value);
}

/**
 * @description 判断value是否为对象（排除array）
 * @param {unknown} value
 * @returns {boolean}
 */
export function isObject(value: unknown): value is object {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * @description 判断value是否为数组
 * @param {unknown} value
 * @returns {boolean}
 */
export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

/**
 * @description 判断value是否为空对象
 * @param {unknown} value
 * @returns {boolean}
 */
export function isEmptyObject(value: unknown) {
  return isObject(value) && Object.keys(value).length < 1;
}

type ExceptOject = {
  [key: string]: unknown;
};

/**
 * @description 深度合并
 * @param {T[]} objects
 * @returns {T}
 */
export function deepMerge<T extends ExceptOject[]>(...objects: T): T[0] {
  return objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      if (isArray(result[key]) && isObject(current[key])) {
        result[key] = Array.from(
          new Set((result[key] as unknown[]).concat(current[key]))
        );
      } else if (isObject(result[key]) && isObject(current[key])) {
        deepMerge(result[key] as T[0], current[key] as T[0]);
      } else {
        result[key] = current[key];
      }
    });

    return result;
  }, {} as T[0]);
}
