import type { PageTree } from 'fumadocs-core/server';
import { loader } from 'fumadocs-core/source';
import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { z } from 'zod';
import { map } from '.map';

const frontmatterSchema = defaultSchemas.frontmatter.extend({
  date: z
    .string()
    .or(z.date())
    .transform((value, context) => {
      try {
        return new Date(value);
      } catch {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid date',
        });
        return z.NEVER;
      }
    }),
});

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/posts',
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema } }),
});

const getDate = (url: string) => {
  const slugs = url.replace(/^\/posts\//, '').split('/');
  const post = getPage(slugs);
  if (post === undefined) return 0;
  return post.data.date.getTime();
};

export const sortedByDatePageTree: PageTree.Root = {
  name: 'Posts',
  children: pageTree.children
    .filter((node) => node.type === 'page')
    .sort((a, b) => getDate(b.url) - getDate(a.url)),
};
