import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.219.76",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "ai-healthcare-system-8jn0.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;