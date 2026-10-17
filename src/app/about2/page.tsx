import type { Metadata } from 'next';
import About2Page from '@/views/About2Page';

export const metadata: Metadata = {
  title: 'About (Preview)',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function About2Route() {
  return <About2Page />;
}

