/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  swcMinify: false,
  experimental: {
    concurrentFeatures: false
  }
}

module.exports = nextConfig;
