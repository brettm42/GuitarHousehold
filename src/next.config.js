/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  swcMinify: false,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com'
    ]
  },
  experimental: {}
}

module.exports = nextConfig;
