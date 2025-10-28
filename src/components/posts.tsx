import { type PageStyles, StylesProvider } from 'fumadocs-ui/contexts/layout';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { type BaseLayoutProps, getLinks } from 'fumadocs-ui/layouts/shared';
import { cn } from 'fumadocs-ui/utils/cn';
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
  const links = getLinks(props.links ?? [], props.githubUrl);

  const variables = cn(
    '[--fd-nav-height:3.5rem] [--fd-tocnav-height:36px] xl:[--fd-toc-width:268px] xl:[--fd-tocnav-height:0px]',
  );

  const pageStyles: PageStyles = {
    tocNav: cn('xl:hidden'),
    toc: cn('max-xl:hidden'),
    page: cn('mt-[var(--fd-nav-height)]'),
    article: cn('mx-auto'),
  };

  return (
    <TreeContextProvider tree={props.tree}>
      <main
        {...props.containerProps}
        className={cn(
          'flex w-full flex-1 flex-row pt-(--fd-nav-height)',
          variables,
          props.containerProps?.className,
        )}
        style={{
          ...props.containerProps?.style,
        }}
      >
        <Header finalLinks={links} nav={nav} />
        <StylesProvider {...pageStyles}>{props.children}</StylesProvider>
      </main>
    </TreeContextProvider>
  );
};
