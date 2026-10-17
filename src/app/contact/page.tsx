import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Sherifiq to discuss web development, SaaS product engineering, or custom digital experiences. Request a quote or project consultation.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Sherifiq',
    description:
      'Get in touch with Sherifiq to discuss web development, SaaS product engineering, or custom digital experiences. Request a quote or project consultation.',
    url: 'https://sherifiq.in/contact',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Contact | Sherifiq — Start a Project',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Sherifiq',
    description:
      'Get in touch with Sherifiq to discuss web development, SaaS product engineering, or custom digital experiences. Request a quote or project consultation.',
    images: ['/og-image.webp'],
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}

