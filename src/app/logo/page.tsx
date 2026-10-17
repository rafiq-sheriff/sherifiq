import type { Metadata } from 'next';
import LogoPage from '@/views/LogoPage';

export const metadata: Metadata = {
  title: 'Brand Asset Generator',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LogoRoute() {
  return <LogoPage />;
}

