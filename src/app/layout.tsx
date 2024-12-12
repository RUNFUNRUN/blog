import { GoogleAnalytics } from '@next/third-parties/google';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from './_components/footer';
import { description, title } from './layout.config';
import './global.css';
import 'katex/dist/katex.css';

const inter = Inter({
  subsets: ['latin'],
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='ja' className={inter.className}>
      {process.env.NODE_ENV === 'production' && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
      )}
      <body className='flex min-h-dvh flex-col'>
        <RootProvider>
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
};

export default Layout;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    images: '/api/og',
  },
  twitter: {
    title,
    description,
    images: '/api/og',
  },
};
