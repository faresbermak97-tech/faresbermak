// src/app/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

// ✅ Error logging service (replace with Sentry, LogRocket, etc. in production)
function logError(error: Error, errorInfo?: { digest?: string }) {
  if (process.env.NODE_ENV === 'production') {
    // In production, send to logging service
    // Example: Sentry.captureException(error, { extra: errorInfo });
    
    // For now, just log to console
    console.error('Error boundary caught:', {
      message: error.message,
      stack: error.stack,
      digest: errorInfo?.digest,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    });
  } else {
    console.error('Error boundary caught:', error);
  }
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logError(error, { digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full px-6 py-3 bg-[#4D64FF] text-white rounded-full hover:bg-[#3d50cc] transition-colors duration-300 font-medium"
          >
            Try again
          </button>
          <Link
            href="/"
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-300 font-medium"
          >
            Go home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-xs font-semibold text-gray-700 mb-2">Error Details (Dev Only):</p>
            <p className="text-sm font-mono text-gray-700 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Need help? Email me at{' '}
            <a
              href="mailto:faresbermak97@gmail.com"
              className="text-[#4D64FF] hover:underline"
            >
              faresbermak97@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}