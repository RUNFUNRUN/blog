import { Layout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Layout nav={{ title: 'RUNFUNRUN Blog', githubUrl: 'https://github.com/RUNFUNRUN/blog' }}>
      {children}
    </Layout>
  );
}
