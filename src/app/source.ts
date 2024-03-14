import { map } from '.map';
import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';
import { z } from 'zod';

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

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/posts',
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema } }),
});
