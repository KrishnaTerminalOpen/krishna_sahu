/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com', 'github.com'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
};

module.exports = nextConfig;

