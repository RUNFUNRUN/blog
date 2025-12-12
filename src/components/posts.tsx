import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { HTMLAttributes, ReactNode } from 'react';
import type { PageTree } from '@/lib/source';
import { Header } from './header';

export interface PostsLayoutProps extends BaseLayoutProps {
  tree: PageTree;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const PostsLayout = ({
  nav = {},
  i18n = false,
  ...props
}: PostsLayoutProps): ReactNode => {
  return (
    <div className='[--fd-layout-width:1200px]'>
      <Header links={props.links} githubUrl={props.githubUrl} nav={nav} />
      <DocsLayout
        tree={props.tree}
        sidebar={{ enabled: false }}
        nav={{ enabled: false }}
        containerProps={{
          className:
            'mx-auto max-w-(--fd-layout-width) w-full [--fd-banner-height:3.5rem]',
        }}
      >
        {props.children}
      </DocsLayout>
    </div>
  );
};
