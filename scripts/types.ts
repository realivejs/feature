import type { OutputOptions } from "rollup";
import type { BUILD_FORMAT } from "./enum";

export type Formats = {
  [key in BUILD_FORMAT]: OutputOptions;
};

export interface BuildOptions {
  formats: Formats;
  pkgPath: string;
  pkgName: string;
}
