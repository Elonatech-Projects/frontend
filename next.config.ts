import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    unoptimized: true, // ✅ disables Next.js image optimization (required for static export)
  },
};

export default nextConfig;
