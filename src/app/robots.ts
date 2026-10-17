import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/logo', '/forms', '/about2'],
      },
    ],
    sitemap: 'https://sherifiq.in/sitemap.xml',
    host: 'https://sherifiq.in',
  };
}
