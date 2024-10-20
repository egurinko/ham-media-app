/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    disableStaticImages: true,
  },
  output: 'standalone',
  experimental: {},
};
