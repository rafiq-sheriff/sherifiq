import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="84"
          height="126"
          viewBox="0 0 43 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.56926 26.5283L26.2157 0.576049C27.4317 -0.654514 29.511 0.217021 29.511 1.9573V29.8629H1.93424C0.214465 29.8629 -0.646802 27.7588 0.56926 26.5283Z"
            fill="#5b72ff"
          />
          <path
            d="M42.4301 38.4713L16.7836 64.4236C15.5676 65.6541 13.4883 64.7826 13.4883 63.0424V35.1367H41.0651C42.7848 35.1367 43.6461 37.2408 42.4301 38.4713Z"
            fill="#5b72ff"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
