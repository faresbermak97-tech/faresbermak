'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            padding: '1rem',
          }}
        >
          <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  marginBottom: '1.5rem',
                }}
              >
                <svg
                  style={{ width: '2.5rem', height: '2.5rem', color: '#dc2626' }}
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
              <h2
                style={{
                  fontSize: '1.875rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '1rem',
                }}
              >
                Application Error
              </h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  marginBottom: '2rem',
                }}
              >
                A critical error occurred. Please refresh the page or try again later.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => reset()}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#4D64FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d50cc')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4D64FF')}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  borderRadius: '9999px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Go home
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && error.message && (
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.5rem',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    color: '#374151',
                    wordBreak: 'break-all',
                  }}
                >
                  {error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}