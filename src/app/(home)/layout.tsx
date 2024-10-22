import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout
      nav={{
        title: 'RUNFUNRUN.dev',
      }}
      githubUrl='https://github.com/RUNFUNRUN/blog'
    >
      {children}
    </HomeLayout>
  );
};

export default Layout;
