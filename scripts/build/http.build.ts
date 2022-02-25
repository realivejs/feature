import type { OutputOptions, RollupOptions } from "rollup";
import { rollup, defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import logger from "../logger";
import { BUILD_FORMAT } from "../enum";

import type { BuildOptions } from "../types";

export async function entry(buildOptions: BuildOptions) {
  const { pkgPath, formats } = buildOptions;
  const input = `${pkgPath}/src/index.ts`;
  const umdName = "EhanceAxios";
  const umdFormat = formats[BUILD_FORMAT.UMD];
  const dtsFormat = formats[BUILD_FORMAT.DTS];
  const configs: RollupOptions[] = [];

  if (umdFormat) {
    umdFormat.name = umdName;
    umdFormat.globals = {
      axios: "axios",
    };
  }

  const output = Object.entries(formats)
    .map(([key, format]) => {
      if (BUILD_FORMAT.DTS !== key && format) {
        return format;
      }
      return undefined;
    })
    .filter((it): it is OutputOptions => !!it);

  configs.push(
    defineConfig({
      input,
      output,
      external: ["axios"],
      plugins: [esbuild()],
    })
  );

  if (dtsFormat) {
    configs.push(
      defineConfig({
        input,
        output: [formats[BUILD_FORMAT.DTS]],
        external: ["axios"],
        plugins: [dts()],
      })
    );
  }

  logger.info(`开始编译打包文件`);

  for await (const config of configs) {
    const bundle = await rollup(config);
    const outputs = config.output as OutputOptions[];

    for await (const output of outputs) {
      await bundle.write(output as OutputOptions);
    }
  }

  logger.complete(`打包完成`);
}
