import path from "path";
import { fileURLToPath } from "url";

// 与配置同目录 = 项目根。避免 Next 子进程 cwd 落在 phase-4-development 时
// @tailwindcss/postcss 用错 base，导致在父目录解析 `tailwindcss` 失败。
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: projectRoot,
    },
  },
};

export default config;
