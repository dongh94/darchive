import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@darchive/api", "@darchive/db"],
};

export default nextConfig;
