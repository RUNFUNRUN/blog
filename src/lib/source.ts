import type { PageTree } from 'fumadocs-core/server';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { blog } from '.source';

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/posts',
  source: createMDXSource(blog, []),
});

export type Post = ReturnType<typeof getPage>;

const getDate = (url: string) => {
  const slugs = url.replace(/^\/posts\//, '').split('/');
  const post = getPage(slugs);
  if (post === undefined) return 0;
  return post.data.date.getTime();
};

export const sortedByDatePages = getPages().toSorted(
  (a, b) => b.data.date.getTime() - a.data.date.getTime(),
);

export const sortedByDatePageTree: PageTree.Root = {
  name: 'Posts',
  children: pageTree.children
    .filter((node) => node.type === 'page')
    .toSorted((a, b) => getDate(a.url) - getDate(b.url)),
};
