import { sortedByDatePageTree } from '@/libs/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';

const RootDocsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DocsLayout
      tree={sortedByDatePageTree}
      nav={{
        title: 'RUNFUNRUN.dev',
      }}
      githubUrl='https://github.com/RUNFUNRUN/blog'
    >
      {children}
    </DocsLayout>
  );
};

export default RootDocsLayout;
