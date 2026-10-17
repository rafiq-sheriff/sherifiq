import type { Metadata } from 'next';
import App from '../App';

export const metadata: Metadata = {
  title: 'Sherifiq | Digital Experience Studio & Web Engineering',
  description:
    'Sherifiq crafts bespoke digital experiences, high-performance websites, scalable SaaS platforms, and modern web applications that elevate ambitious brands.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sherifiq | Digital Experience Studio & Web Engineering',
    description:
      'Sherifiq crafts bespoke digital experiences, high-performance websites, scalable SaaS platforms, and modern web applications that elevate ambitious brands.',
    url: 'https://sherifiq.in',
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
};

export default function HomePage() {
  return <App />;
}

