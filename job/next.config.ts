import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "res.cloudinary.com"], // Add Cloudinary domain
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb", // Corrected to "20mb" (lowercase)
    },
  },
};

export default nextConfig;
