import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // enables static export
  images: {
    unoptimized: true, // ✅ disables Next.js image optimization (required for static export)
  },
};

export default nextConfig;
