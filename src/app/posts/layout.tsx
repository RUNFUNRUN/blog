import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { sortedByDatePageTree } from '../source';

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={sortedByDatePageTree}
      nav={{
        title: 'RUNFUNRUN.tech',
        githubUrl: 'https://github.com/RUNFUNRUN/blog',
      }}
    >
      {children}
    </DocsLayout>
  );
}
