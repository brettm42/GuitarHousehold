/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  swcMinify: true,
  experimental: {
    concurrentFeatures: false
  }
}

module.exports = nextConfig;
