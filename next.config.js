/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  // Exclude the model.h5 file from the build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.h5$/,
      type: 'asset/resource'
    });
    return config;
  }
};

module.exports = nextConfig; 