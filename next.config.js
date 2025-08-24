/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
  typescript: {
    // Temporarily ignore type errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore eslint errors during build
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enable if needed
    appDir: true,
  },
  // Ensure all pages are generated at build time
  generateStaticParams: true,
  // Generate 404 page
  generateBuildId: async () => 'build',
  // Add assetPrefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://guykastner.com' : ''
}

module.exports = nextConfig 
