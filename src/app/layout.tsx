import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Sherifiq • Digital Experiences & Web Engineering',
  description:
    'Crafting bespoke digital experiences, high-end web applications, and interactive visual engineering that elevate your brand.',
  keywords: [
    'Sherifiq',
    'Web Development',
    'Digital Experiences',
    'Creative Engineering',
    'UI/UX Design',
    'React Developer',
    'Frontend Specialist',
  ],
  authors: [{ name: 'Sherifiq' }],
  alternates: {
    canonical: 'https://www.sherifiq.in/',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/og-image.jpg',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.sherifiq.in/',
    siteName: 'Sherifiq',
    title: 'Sherifiq • Digital Experiences & Web Engineering',
    description:
      'Crafting bespoke digital experiences, high-end web applications, and interactive visual engineering that elevate your brand.',
    images: [
      {
        url: 'https://www.sherifiq.in/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Sherifiq • Digital Experiences & Web Engineering',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sherifiq • Digital Experiences & Web Engineering',
    description:
      'Crafting bespoke digital experiences, high-end web applications, and interactive visual engineering that elevate your brand.',
    images: ['https://www.sherifiq.in/og-image.webp'],
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
