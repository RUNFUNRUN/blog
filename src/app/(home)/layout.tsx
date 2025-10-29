import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { baseOptions, linkItems, title } from '../layout.config';

const Layout = ({ children }: LayoutProps<'/'>) => {
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
    siteName: title,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/api/rss.xml',
    },
  },
};
