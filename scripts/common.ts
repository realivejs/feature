import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const _join = path.join;
const _resolve = path.resolve;

export function join(..._path: string[]) {
  return _join(__dirname, ..._path);
}

export function resolve(..._path: string[]) {
  return _resolve(__dirname, ..._path);
}
