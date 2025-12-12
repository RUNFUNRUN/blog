import { HomeLayout } from 'fumadocs-ui/layouts/home';
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
            links={linkItems}
            githubUrl={baseOptions.githubUrl}
            nav={baseOptions.nav}
            className='[--fd-layout-width:1280px]'
          />
        ),
      }}
    >
      <main className='px-4 my-12 xl:mx-auto xl:w-7xl'>{children}</main>
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
