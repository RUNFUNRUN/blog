import { sortedByDatePageTree } from '@/libs/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { baseOptions, linkItems } from '../layout.config';

const RootDocsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DocsLayout {...baseOptions} tree={sortedByDatePageTree} links={linkItems}>
      {children}
    </DocsLayout>
  );
};

export default RootDocsLayout;
