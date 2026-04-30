import type { NextConfig } from "next";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");
function normalizeDevOrigin(input: string) {
  const raw = input.trim();
  if (!raw) return "";
  const withoutProtocol = raw.replace(/^[a-z]+:\/\//i, "");
  return withoutProtocol.split("/")[0].split(":")[0];
}
const allowedDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map(normalizeDevOrigin)
  .filter(Boolean);

const nextConfig: NextConfig = {
  /** 开发模式 (`next dev`) 右下角「N」调试入口；生产构建不会出现 */
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  allowedDevOrigins,
  images: {
    unoptimized: true,
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
};

export default nextConfig;
