import { map } from '.map';
import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';
import { z } from 'zod';
import { PageTree } from 'fumadocs-core/server';

const frontmatterSchema = defaultSchemas.frontmatter.extend({
  date: z
    .string()
    .or(z.date())
    .transform((value, context) => {
      try {
        return new Date(value);
      } catch {
        context.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid date' });
        return z.NEVER;
      }
    }),
});

export const {
  getPage,
  getPages,
  pageTree: sortedByDateTree,
} = loader({
  baseUrl: '/posts',
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema } }),
});

const getDate = (url: string) => {
  const slugs = url.replace(/^\/posts\//, '').split('/');
  const post = getPage(slugs);
  if (post === undefined) return 0;
  return post.data.date.getTime();
};

const isPageNode = (node: PageTree.Node): node is PageTree.Item => {
  return node.type === 'page';
};

export const pageTree: PageTree.Root = {
  name: 'Blog',
  children: [
    ...sortedByDateTree.children.filter(isPageNode).sort((a, b) => getDate(b.url) - getDate(a.url)),
  ],
};
