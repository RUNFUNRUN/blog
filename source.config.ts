import { transformerRemoveNotationEscape } from '@shikijs/transformers';
import {
  rehypeCodeDefaultOptions,
  remarkImage,
} from 'fumadocs-core/mdx-plugins';
import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { z } from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content',
  schema: frontmatterSchema.extend({
    date: z
      .string()
      .or(z.date())
      .transform((value, context) => {
        try {
          return new Date(value);
        } catch {
          context.issues.push({
            code: 'custom',
            message: 'The value could not be transformed to Date type.',
            input: value,
          });
          return z.NEVER;
        }
      }),
    tags: z.array(z.string()).optional(),
  }),
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypeCodeOptions: {
      inline: 'tailing-curly-colon',
      themes: {
        light: 'github-light',
        dark: 'tokyo-night',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
        transformerRemoveNotationEscape(),
      ],
    },
    remarkPlugins: [remarkImage, remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
