/** @type {import('next').NextConfig} */

const externals = ['pino-pretty', 'lokijs', 'utf-8-validate', 'bufferutil'];

const nextConfig = {
  webpack: (config) => {
    config.externals.push(...externals);
    return config;
  },
  eslint: {
    dirs: ['components', 'hooks', 'lib', 'app'],
  },
  experimental: {
    turbo: {
      externals: externals,
    },
  },
};

module.exports = nextConfig;
