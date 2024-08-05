import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/home-layout';

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
