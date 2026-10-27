import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
    const rawUrl = process.env.INTERNAL_API_URL || 'http://seapedia-backend-container:8000/api';
    const baseUrl = rawUrl.replace(/\/$/, '');
    const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
