import { Layout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout
      nav={{
        title: 'RUNFUNRUN.tech',
      }}
      githubUrl='https://github.com/RUNFUNRUN/blog'
    >
      {children}
    </Layout>
  );
};

export default HomeLayout;
