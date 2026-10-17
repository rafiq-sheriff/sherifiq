import type { Metadata } from 'next';
import AboutPage from '@/views/AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Sherifiq, a digital studio focused on high-performance web engineering, modern SaaS products, and bespoke digital experiences.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Sherifiq',
    description:
      'Learn about Sherifiq, a digital studio focused on high-performance web engineering, modern SaaS products, and bespoke digital experiences.',
    url: 'https://sherifiq.in/about',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'About Us | Sherifiq — Digital Experience & Engineering Studio',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Sherifiq',
    description:
      'Learn about Sherifiq, a digital studio focused on high-performance web engineering, modern SaaS products, and bespoke digital experiences.',
    images: ['/og-image.webp'],
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}

