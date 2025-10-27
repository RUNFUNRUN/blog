import type { Metadata } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { description, title } from './layout.config';
import './global.css';
import 'katex/dist/katex.css';
import { RootProvider } from 'fumadocs-ui/provider/next';

const geist = Geist({
  subsets: ['latin'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang='ja'
      className={`${geist.className} ${jetbrains.variable} antialiased`}
    >
      <body className='flex min-h-dvh flex-col'>
        <RootProvider>
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;

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
