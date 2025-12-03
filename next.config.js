/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Enable strict mode for better error handling
  reactStrictMode: true,

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress output
  compress: true,

  // Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Turbopack configuration
  turbopack: {
    // Turbopack specific options go here
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [];
  },

  // Webpack configuration
  webpack: (config) => {
    // Add custom webpack config here if needed
    return config;
  },
};

export default nextConfig;
