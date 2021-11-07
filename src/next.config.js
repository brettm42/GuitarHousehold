/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  swcMinify: true,
  experimental: {
    concurrentFeatures: true
  }
}

module.exports = nextConfig;
