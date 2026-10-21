/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workers can't run the built-in image optimizer; images are served as-is.
  images: { unoptimized: true },
  experimental: {
    // Allow gallery/staff photo uploads through Server Actions.
    serverActions: { bodySizeLimit: "25mb" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
