// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/_next/',
          '/admin/',
          '/*.json',
          '/*.xml',
        ],
      },
      // Block AI crawlers from training on your content
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
      {
        userAgent: 'Claude-Web',
        disallow: ['/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: ['/'],
      },
      {
        userAgent: 'Applebot-Extended',
        disallow: ['/'],
      },
    ],
    sitemap: 'https://faresbermak.vercel.app/sitemap.xml',
    host: 'https://faresbermak.vercel.app',
  }
}