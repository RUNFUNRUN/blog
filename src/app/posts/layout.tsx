import { PostsLayout } from '@/components/posts';
import { postTreeSortedByDate } from '@/lib/source';
import type { ReactNode } from 'react';
import { baseOptions, linkItems } from '../layout.config';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <PostsLayout {...baseOptions} tree={postTreeSortedByDate} links={linkItems}>
      {children}
    </PostsLayout>
  );
};

export default Layout;
