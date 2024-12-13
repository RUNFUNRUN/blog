import type { LinkItemType } from 'fumadocs-ui/layouts/links';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Rss } from 'lucide-react';

export const title = 'RUNFUNRUN.dev';
export const description = 'This is my tech blog.';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
  githubUrl: 'https://github.com/RUNFUNRUN/blog',
};

export const linkItems: LinkItemType[] = [
  {
    type: 'icon',
    label: 'rss',
    icon: <Rss />,
    text: 'RSS',
    url: '/api/rss.xml',
  },
];
