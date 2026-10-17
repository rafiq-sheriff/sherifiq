import type { Metadata } from 'next';
import FormsPage from '@/views/FormsPage';

export const metadata: Metadata = {
  title: 'Inquiry Forms',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function FormsRoute() {
  return <FormsPage />;
}

