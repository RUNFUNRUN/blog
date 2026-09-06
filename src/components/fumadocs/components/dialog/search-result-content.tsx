import { createMarkdownRenderer } from 'fumadocs-core/content/md';
import type { ComponentProps, ReactNode } from 'react';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

const { Markdown } = createMarkdownRenderer({
  remarkRehypeOptions: { allowDangerousHtml: true },
  rehypePlugins: [
    rehypeRaw,
    [rehypeSanitize, { tagNames: ['mark'], attributes: {} }],
  ],
});

const components = {
  mark: ({ children }: ComponentProps<'mark'>) => (
    <span className='text-fd-primary underline'>{children}</span>
  ),
};

// Search results are Markdown in newer core versions; keep the existing plain
// text appearance and interpret only the sanitized search highlight markup.
export const SearchResultContent = ({ children }: { children: ReactNode }) => {
  if (typeof children !== 'string') return children;
  return <Markdown components={components}>{children}</Markdown>;
};
