import path from "path";
import validate from "validate-npm-package-name";
import fse from "fs-extra";
import * as globby from "globby";

import type { Formats } from "./types";
import logger from "./logger";
import config from "./config";
import { BUILD_FORMAT } from "./enum";

/**
 * @description 获取package name所在的目录的名称
 * @param {string} name
 * @returns {string}
 */
export function getPkgNameFileDirName(name: string): string {
  const hasAt = name.startsWith("@");

  return hasAt ? name.split("/")[1] : name;
}

/**
 * @description 校验npm包名规范
 * @param {string} name
 * @returns {boolean}
 */
export function validatePkgName(name: string): boolean {
  const { validForNewPackages, errors, warnings } = validate(name);

  if (!validForNewPackages) {
    logger.error(`package name 不规范: ${validForNewPackages}, 请检查后再试`);

    if (errors) {
      errors.forEach((err: string) => logger.error(err));
    }

    if (warnings) {
      warnings.forEach((warning) => logger.error(warning));
    }
  }

  return true;
}

/**
 * @description 检查命令行输入的name是否存在,存在返回路径
 * @param {string} name
 * @returns {string}
 */
export function checkPackage(name: string): string {
  if (!name) {
    logger.error(`请输入 package name`);
    return "";
  }

  if (!validatePkgName(name)) {
    return "";
  }

  const pkgs = globby.globbySync(
    `${config.ROOT_PACKAGE_PATH}/**/package.json`,
    {
      onlyFiles: true,
      gitignore: true,
      ignore: ["node_modules/**/packages.json"],
    }
  );

  const pkgNames = pkgs.filter((pkg) => name === fse.readJSONSync(pkg)?.name);

  if (pkgNames.length <= 0) {
    logger.error(
      `${config.ROOT_PACKAGE_PATH}未找到package.json name：${name}的文件，请检查后重试`
    );
    return "";
  }

  if (pkgNames.length > 1) {
    logger.error(
      `${config.ROOT_PACKAGE_PATH}下package name: ${name}超过1个，请检查是否重名`
    );
    return "";
  }

  if (pkgNames.length > 0) {
    const pkgDirPath = `${config.ROOT_PACKAGE_PATH}/${getPkgNameFileDirName(
      name
    )}`;

    const hasPkgDir = fse.existsSync(pkgDirPath);

    if (!hasPkgDir) {
      logger.error(
        `请检查${config.ROOT_PACKAGE_PATH}下是否存在${name}的存放目录`
      );
    }

    return hasPkgDir ? pkgDirPath : "";
  }

  return "";
}

const banner = `/*!
 * @realive/http v1.0.1
 * (c) 2021-${new Date().getFullYear()} Russell
 * Released under the MIT License.
 */`;

/**
 * @description 通过package.json获取打包格式
 * @param {string} pkgPath
 * @returns {void}
 */
export function getFileFormatByPkg(pkgPath: string): Formats {
  const pkgDir = path.resolve(pkgPath, "../");
  const pkg = fse.readJsonSync(pkgPath);

  const formats = {} as Formats;
  const { main, module, unpkg, jsdelivr, umd, types } = pkg;

  if (main) {
    formats[BUILD_FORMAT.CJS] = {
      file: path.join(pkgDir, main),
      sourcemap: true,
      banner,
      format: BUILD_FORMAT.CJS,
    };
  }

  if (module) {
    formats[BUILD_FORMAT.ES] = {
      file: path.join(pkgDir, module),
      sourcemap: true,
      banner,
      format: BUILD_FORMAT.ES,
    };
  }

  if (unpkg || jsdelivr || umd) {
    formats[BUILD_FORMAT.UMD] = {
      file: path.join(pkgDir, unpkg || jsdelivr || umd),
      sourcemap: true,
      banner,
      format: BUILD_FORMAT.UMD,
    };
  }

  if (types) {
    formats[BUILD_FORMAT.DTS] = {
      file: path.join(pkgDir, types),
      banner,
      format: BUILD_FORMAT.ES,
    };
  }

  return formats;
}
