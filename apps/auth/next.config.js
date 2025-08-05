/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@peakhealth/auth'],
};

module.exports = nextConfig;
