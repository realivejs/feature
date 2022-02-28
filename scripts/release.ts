import { execSync } from "child_process";
import logger from "./logger";

logger.warn("开始执行变更检查");
execSync("pnpm changeset");
logger.warn("更新 package.json version");
execSync("pnpm changeset version");
logger.info("准备发布");
execSync("pnpm changeset publish");
logger.info("发布成功");
