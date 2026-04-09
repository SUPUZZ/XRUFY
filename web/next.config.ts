import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Standalone API process (see /server). Next rewrites same-origin /api/forms → server. */
const serverOrigin = process.env.SERVER_ORIGIN ?? "http://127.0.0.1:4000";

const nextConfig: NextConfig = {
  /** 开发模式 (`next dev`) 右下角「N」调试入口；生产构建不会出现 */
  devIndicators: false,
  output: "standalone",
  outputFileTracingRoot: monorepoRoot,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/forms",
        destination: `${serverOrigin}/api/forms`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${serverOrigin}/api/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
