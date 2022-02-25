import logger from "../logger";
import {
  checkPackage,
  getFileFormatByPkg,
  getPkgNameFileDirName,
} from "../helper";
import type { BuildOptions } from "../types";

/**
 * @description 解析命令行执行命令
 * @returns {void}
 */
async function parseCommand() {
  const args = process.argv;
  const argsPkgName = args[2];

  logger.info("开始解析命令行参数");

  const pkgPath = checkPackage(argsPkgName);

  logger.info(`解析${argsPkgName}所在目录: ${pkgPath}`);

  if (pkgPath) {
    const pkgDirName = getPkgNameFileDirName(argsPkgName);
    const entryFilename = `${pkgDirName}.build`;

    logger.info(`开始根据${argsPkgName} package.json文件分析打包格式`);

    const formats = getFileFormatByPkg(`${pkgPath}/package.json`);

    if (formats) {
      const formatLogger = Object.keys(formats).join(",");

      logger.info(`打包输出格式为${formatLogger}`);
      logger.info(
        `开始执行${argsPkgName} ---> ${entryFilename}打包文件，请等待`
      );

      const entryOptions: BuildOptions = {
        pkgPath,
        pkgName: argsPkgName,
        formats,
      };

      (await import(`./${entryFilename}`)).entry(entryOptions);
    }
  }
}

parseCommand();
