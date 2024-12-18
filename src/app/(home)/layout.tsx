import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { baseOptions, linkItems } from '../layout.config';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout {...baseOptions} links={linkItems}>
      {children}
    </HomeLayout>
  );
};

export default Layout;

export const metadata: Metadata = {
  openGraph: {
    images: '/api/og',
    url: '/',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/api/rss.xml',
    },
  },
};
