import type { LinkItemType } from 'fumadocs-ui/layouts/links';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Newspaper, Rss, Tags, User } from 'lucide-react';

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
    icon: <Newspaper />,
    text: 'Posts',
    url: '/list',
    active: 'url',
  },
  {
    icon: <Tags />,
    text: 'Tags',
    url: '/tags',
    active: 'url',
  },
  {
    type: 'icon',
    label: 'About me',
    icon: <User />,
    text: 'About Me',
    url: 'https://runfun.run',
  },
  {
    type: 'icon',
    label: 'rss',
    icon: <Rss />,
    text: 'RSS',
    url: '/api/rss.xml',
  },
];

export const postsPerPage = 5;
