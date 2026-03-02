import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
    domains: ["localhost"],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
