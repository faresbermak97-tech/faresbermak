/** @type {import('next').NextConfig} */

const nextConfig = {
  reactCompiler: true,

  // Enable strict mode for better error handling
  reactStrictMode: true,

  // ✅ OPTIMIZED IMAGE CONFIGURATION
  images: {
    // Only add remote patterns if you're actually using remote images
    // Since all your images are local (/Pictures/), this can be empty
    remotePatterns: [
      // Example for future remote images (currently not needed):
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],

    // ✅ Modern image formats (already good)
    formats: ['image/webp', 'image/avif'],

    // ✅ Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // ✅ Image sizes for smaller dimensions
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // ✅ Image quality settings
    qualities: [75, 85],

    // ✅ Enable image optimization
    unoptimized: false,

    // ✅ Minimize image quality slightly for better performance (default is 75)
    minimumCacheTTL: 60, // Cache optimized images for 60 seconds
  },

  // Compress output
  compress: true,

  // Enable experimental features
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@vercel/analytics',
      '@vercel/speed-insights'
    ],
    optimizeCss: true,
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
        // Cache static images for 1 year
        source: '/Pictures/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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