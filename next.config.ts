import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.47'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reimagined-succotash-tau.vercel.app',
        pathname: '/images/**',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
