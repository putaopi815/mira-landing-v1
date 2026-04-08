import type { NextConfig } from "next";
import path from "path";
import { createRequire } from "module";

// import.meta.url 在 Next 编译 next.config 时可能落在缓存目录，导致 turbopack.root 错误、
// PostCSS 在 phase-4-development 父级解析 tailwindcss。用 package.json 锚定真实项目根。
const require = createRequire(import.meta.url);
const projectRoot = path.dirname(require.resolve("./package.json"));
const tailwindEntry = path.join(projectRoot, "node_modules", "tailwindcss");

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: tailwindEntry,
    },
  },
  webpack: (config) => {
    const nm = path.join(projectRoot, "node_modules");
    config.resolve.modules = [nm, ...(config.resolve.modules ?? [])];
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: tailwindEntry,
    };
    return config;
  },
};

export default nextConfig;
