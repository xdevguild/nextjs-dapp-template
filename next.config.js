/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push(
      'pino-pretty',
      'lokijs',
      'utf-8-validate',
      'bufferutil'
    );
    return config;
  },
  eslint: {
    dirs: ['components', 'hooks', 'lib', 'app'],
  },
};

module.exports = nextConfig;
