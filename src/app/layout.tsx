import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'RUNFUNRUN.tech',
  description: 'This is my tech blog.',
  openGraph: {
    images: '/miwa.jpeg',
  },
  twitter: {
    images: '/miwa.jpeg',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={inter.className}>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
