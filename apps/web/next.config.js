/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: config => {
    // Silence known dynamic require warning from @supabase/realtime-js
    const originalIgnore = config.ignoreWarnings || [];
    config.ignoreWarnings = [
      ...originalIgnore,
      warning =>
        typeof warning.message === 'string' &&
        warning.message.includes(
          'Critical dependency: the request of a dependency is an expression'
        ) &&
        warning.module &&
        warning.module.resource &&
        warning.module.resource.includes(
          '@supabase/realtime-js/dist/module/lib/websocket-factory.js'
        ),
    ];
    return config;
  },
};

module.exports = nextConfig;
