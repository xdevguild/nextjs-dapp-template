/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      process: require.resolve('process/browser'),
    };
    return config;
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_MULTIVERSX_API}/:path*`,
        destination: `${process.env.MULTIVERSX_CUSTOM_API}/:path*`,
      },
    ];
  },
  eslint: {
    dirs: ['components', 'config', 'hooks', 'pages', 'store', 'types', 'utils'],
  },
};

module.exports = nextConfig;
