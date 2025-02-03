import { Header } from '@/components/header';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { baseOptions, linkItems } from '../layout.config';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout
      {...baseOptions}
      links={linkItems}
      nav={{
        component: (
          <Header
            finalLinks={getLinks(linkItems, baseOptions.githubUrl)}
            {...baseOptions}
          />
        ),
      }}
      className=''
    >
      <main className='mx-4 my-12 lg:mx-auto lg:w-[992px]'>{children}</main>
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
