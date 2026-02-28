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

        source: "/api/auth/:path*",

        destination: `${process.env.NEXT_PUBLIC_TEST}/api/auth/:path*`,

      },

    ];

  },

};


export default nextConfig;
