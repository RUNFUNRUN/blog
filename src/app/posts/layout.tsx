import { PostsLayout } from '@/components/posts';
import { postTreeSortedByDate } from '@/lib/source';
import { baseOptions, linkItems } from '../layout.config';

const Layout = ({ children }: LayoutProps<'/posts'>) => {
  return (
    <PostsLayout {...baseOptions} tree={postTreeSortedByDate} links={linkItems}>
      {children}
    </PostsLayout>
  );
};

export default Layout;
