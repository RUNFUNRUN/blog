import './global.css';
import 'katex/dist/katex.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from './_components/Footer';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'RUNFUNRUN.tech',
  description: 'This is my tech blog.',
  openGraph: {
    title: 'RUNFUNRUN.tech',
    description: 'This is my tech blog.',
    images: '/api/og',
    url: '/',
  },
  twitter: {
    title: 'RUNFUNRUN.tech',
    description: 'This is my tech blog.',
    images: '/api/og',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja' className={inter.className}>
      {process.env.NODE_ENV === 'production' && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
      )}
      <body className='flex min-h-screen flex-col'>
        <RootProvider>
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
