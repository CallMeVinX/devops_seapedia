import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output : "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ziedlelaawqyoyoedzdg.supabase.co',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://seapedia-backend-container:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
