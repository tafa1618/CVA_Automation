import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/CVA_Automation",
  assetPrefix: "/CVA_Automation",
};

export default nextConfig;
