import { blog } from '.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';

export const {
  getPage: getPost,
  getPages: getPosts,
  pageTree,
} = loader({
  baseUrl: '/posts',
  source: createMDXSource(blog),
});

export type Post = ReturnType<typeof getPost>;

export type PageTree = typeof pageTree;

const getDate = (url: string) => {
  const slugs = url.replace(/^\/posts\//, '').split('/');
  const post = getPost(slugs);
  if (post === undefined) return 0;
  return post.data.date.getTime();
};

export const postTreeSortedByDate = {
  name: 'Posts',
  children: pageTree.children
    .filter((node) => node.type === 'page')
    .toSorted((a, b) => getDate(a.url) - getDate(b.url)),
};

const posts = getPosts();

export const getPostsSortedByDate = () =>
  posts.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const getTags = () => {
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.data.tags) {
      for (const tag of post.data.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).toSorted();
};

export const getPostsByTag = (tag: string) => {
  return posts
    .filter((post) => post.data.tags?.includes(tag))
    .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
