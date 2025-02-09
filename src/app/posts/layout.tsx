import { DocsLayout } from '@/components/docs';
import { sortedByDatePageTree } from '@/lib/source';
import type { ReactNode } from 'react';
import { baseOptions, linkItems } from '../layout.config';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <DocsLayout {...baseOptions} tree={sortedByDatePageTree} links={linkItems}>
      {children}
    </DocsLayout>
  );
};

export default Layout;
