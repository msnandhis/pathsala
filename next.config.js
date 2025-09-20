/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled for client-side dynamic routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
