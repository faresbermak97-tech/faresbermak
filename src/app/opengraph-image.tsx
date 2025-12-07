import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Fares Bermak - Remote Virtual Assistant & Data Entry Expert'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Fares Bermak
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 36,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: 40,
              maxWidth: 900,
              lineHeight: 1.3,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Remote Virtual Assistant & Data Entry Expert
          </div>

          {/* Badges */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                borderRadius: 9999,
                fontSize: 20,
                color: 'white',
                fontWeight: 600,
              }}
            >
              🌐 Trilingual
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                borderRadius: 9999,
                fontSize: 20,
                color: 'white',
                fontWeight: 600,
              }}
            >
              ⚡ 99%+ Accuracy
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                borderRadius: 9999,
                fontSize: 20,
                color: 'white',
                fontWeight: 600,
              }}
            >
              🎯 Remote Expert
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '40px 80px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 600,
            }}
          >
            faresbermak97@gmail.com
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 600,
            }}
          >
            +213 542 346 579
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}