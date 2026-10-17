import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sherifiq.in'),
  title: {
    default: 'Sherifiq | Digital Experience Studio & Web Engineering',
    template: '%s | Sherifiq',
  },
  description:
    'Sherifiq crafts bespoke digital experiences, high-performance websites, scalable SaaS platforms, and modern web applications that elevate ambitious brands.',
  keywords: [
    'Sherifiq',
    'Web Development Studio',
    'Digital Experiences',
    'Creative Engineering',
    'UI/UX Design',
    'SaaS Development',
    'React & Next.js Developers',
    'Frontend Specialists',
  ],
  authors: [{ name: 'Sherifiq', url: 'https://sherifiq.in' }],
  creator: 'Sherifiq',
  publisher: 'Sherifiq',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://sherifiq.in',
    siteName: 'Sherifiq',
    title: 'Sherifiq | Digital Experience Studio & Web Engineering',
    description:
      'Sherifiq crafts bespoke digital experiences, high-performance websites, scalable SaaS platforms, and modern web applications that elevate ambitious brands.',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Sherifiq | Digital Experience Studio & Web Engineering',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sherifiq | Digital Experience Studio & Web Engineering',
    description:
      'Sherifiq crafts bespoke digital experiences, high-performance websites, scalable SaaS platforms, and modern web applications that elevate ambitious brands.',
    images: ['/og-image.webp'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
