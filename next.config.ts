import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* config options here */
  logging: {
    fetches:{
      fullUrl:true
    },
  },
  experimental: {
    serverActions:{
      bodySizeLimit: '10mb'
    }
  },
  async rewrites(){
    return [
      {
        source: '/upload/:slug',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`
      }
    ]
  }
};

export default nextConfig;
