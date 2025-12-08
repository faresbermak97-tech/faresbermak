/** @type {import('next').NextConfig} */

const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,

  // ✅ CRITICAL FCP FIX: Optimize CSS extraction
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@vercel/analytics',
      '@vercel/speed-insights'
    ],
    optimizeCss: true, // ✅ Reduces CSS bundle size
    webpackBuildWorker: true, // ✅ Faster builds
  },

  // ✅ OPTIMIZED IMAGE CONFIGURATION
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85], // Added quality 85 to match the images in use
    minimumCacheTTL: 60,
    unoptimized: false,
  },

  // ✅ Enable compression
  compress: true,

  // ✅ CRITICAL: Reduce JavaScript bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // ✅ Security headers (already good)
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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
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
      {
        // ✅ EXTENDED: Cache images for 1 year
        source: '/Pictures/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // ✅ NEW: Cache fonts for 1 year
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [];
  },

  webpack: (config) => {
    return config;
  },

  turbopack: {
    // Empty turbopack config to silence the error
  },
};

export default nextConfig;