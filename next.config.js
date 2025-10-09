/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true, // ensures Next knows you’re using the app router
  },
};

module.exports = nextConfig;
