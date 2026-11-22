import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0c0d0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e4a853',
          fontFamily: 'serif',
          fontWeight: 600,
          borderRadius: 6,
          border: '1px solid rgba(228, 168, 83, 0.4)',
        }}
      >
        K
      </div>
    ),
    {
      ...size,
    }
  );
}
