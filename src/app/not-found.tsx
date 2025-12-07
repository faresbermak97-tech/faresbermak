import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#4D64FF] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-[#4D64FF] text-white rounded-full hover:bg-[#3d50cc] transition-colors duration-300 font-medium"
          >
            Go back home
          </Link>
          <Link
            href="/#contact"
            className="inline-block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-300 font-medium"
          >
            Contact me
          </Link>
        </div>

        <div className="mt-12">
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