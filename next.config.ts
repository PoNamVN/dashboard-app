import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    ppr: 'incremental',
  },
};

export default nextConfig;
