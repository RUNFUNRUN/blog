import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { baseOptions, linkItems } from '../layout.config';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout {...baseOptions} links={linkItems}>
      {children}
    </HomeLayout>
  );
};

export default Layout;
