import type { Metadata } from 'next';
import ProjectPage from '@/views/ProjectPage';

export const metadata: Metadata = {
  title: 'Projects Archive',
  description:
    'Explore selected web development and engineering projects by Sherifiq, featuring e-commerce websites, SaaS platforms, healthcare systems, and web applications.',
  alternates: {
    canonical: '/project',
  },
  openGraph: {
    title: 'Projects Archive | Sherifiq',
    description:
      'Explore selected web development and engineering projects by Sherifiq, featuring e-commerce websites, SaaS platforms, healthcare systems, and web applications.',
    url: 'https://sherifiq.in/project',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Projects Archive | Sherifiq — Selected Works & Web Archive',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects Archive | Sherifiq',
    description:
      'Explore selected web development and engineering projects by Sherifiq, featuring e-commerce websites, SaaS platforms, healthcare systems, and web applications.',
    images: ['/og-image.webp'],
  },
};

export default function ProjectRoute() {
  return <ProjectPage />;
}

