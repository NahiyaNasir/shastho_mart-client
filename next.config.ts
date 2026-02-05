import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ibb.co.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/admin-dashboard',
      },
     
      
    ]
  },
};

export default nextConfig;
