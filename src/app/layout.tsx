// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Fares Bermak - Remote Virtual Assistant & Data Entry Expert",
  description: "Professional remote virtual assistant, data entry specialist, and IT support. I help businesses automate workflows, organize data, and streamline operations. 99%+ accuracy, 5-15 hours saved weekly.",
  keywords: [
    "virtual assistant",
    "remote assistant",
    "data entry",
    "administrative support",
    "workflow automation",
    "IT support",
    "remote work",
    "freelance assistant",
    "Algeria",
    "trilingual assistant"
  ],
  authors: [{ name: "Fares Bermak" }],
  creator: "Fares Bermak",
  publisher: "Fares Bermak",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faresbermak.vercel.app",
    title: "Fares Bermak - Remote Virtual Assistant & Data Entry Expert",
    description: "Professional remote virtual assistant and data entry services. Automate workflows, organize data, and streamline your business operations.",
    siteName: "Fares Bermak Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fares Bermak - Virtual Assistant",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fares Bermak - Remote Virtual Assistant",
    description: "Professional remote virtual assistant and data entry services",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  metadataBase: new URL("https://faresbermak.vercel.app"),
  alternates: {
    canonical: "https://faresbermak.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Touch Icons */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fares Bermak" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Preload critical assets */}
        <link 
          rel="preload" 
          as="image" 
          href="/Pictures/hero-image.webp"
          imageSizes="100vw" 
          fetchPriority="high"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Fares Bermak",
              jobTitle: "Remote Virtual Assistant & Data Entry Specialist",
              description: "Professional remote virtual assistant specializing in data entry, workflow automation, and IT support",
              url: "https://faresbermak.vercel.app",
              image: "https://faresbermak.vercel.app/Pictures/about me pic.webp",
              sameAs: [
                "https://www.linkedin.com/in/faresbermak-va/",
                "https://www.instagram.com/bermak_fares/"
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "DZ",
                addressLocality: "Blida"
              },
              email: "faresbermak97@gmail.com",
              telephone: "+213542346579",
              knowsLanguage: ["Arabic", "English", "French"],
              hasOccupation: {
                "@type": "Occupation",
                name: "Virtual Assistant",
                occupationLocation: {
                  "@type": "Place",
                  name: "Remote"
                },
                skills: [
                  "Data Entry",
                  "Administrative Support",
                  "Workflow Automation",
                  "IT Support Level 1",
                  "Google Workspace",
                  "Microsoft Office",
                  "Zapier",
                  "CRM Management"
                ]
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
        
        {/* Load analytics after main content */}
        <SpeedInsights />
        <Analytics />

        {/* Register Service Worker */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="register-sw"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                      .then(reg => console.log('SW registered'))
                      .catch(err => console.log('SW registration failed', err));
                  });
                }
              `
            }}
          />
        )}
      </body>
    </html>
  );
}