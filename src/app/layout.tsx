import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// ✅ OPTIMIZED FONT CONFIGURATION
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents FOIT (Flash of Invisible Text)
  variable: "--font-inter", // CSS variable for flexibility
  preload: true, // Explicitly preload for better performance
  fallback: ["system-ui", "arial"], // Fallback fonts
  adjustFontFallback: true, // Automatic fallback font optimization
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

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faresbermak.vercel.app",
    title: "Fares Bermak - Remote Virtual Assistant & Data Entry Expert",
    description: "Professional remote virtual assistant and data entry services. Automate workflows, organize data, and streamline your business operations.",
    siteName: "Fares Bermak Portfolio",
    images: [
      {
        url: "/opengraph-image", // Uses the dynamic OG image we created
        width: 1200,
        height: 630,
        alt: "Fares Bermak - Virtual Assistant",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Fares Bermak - Remote Virtual Assistant",
    description: "Professional remote virtual assistant and data entry services",
    images: ["/opengraph-image"],
  },

  // Additional Meta
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

  // Manifest
  manifest: "/manifest.json",

  // Icons
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

  // Other
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
    // ✅ OPTIMIZED: Using both className and variable for maximum flexibility
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <head>
        {/* Performance & Security */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Touch Icons */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fares Bermak" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload hero image for faster LCP */}
        <link 
          rel="preload" 
          as="image" 
          href="/Pictures/hero-image.webp" 
          fetchPriority="high"
        />

        {/* Structured Data (JSON-LD) for SEO */}
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}