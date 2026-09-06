'use client';
import * as Primitive from 'fumadocs-core/toc';
import { type ComponentProps, useRef } from 'react';
import { cn } from '@/components/fumadocs/base/cn';
import {
  TocThumb,
  useTOCItems,
} from '@/components/fumadocs/base/components/toc';
import { useI18n } from '@/components/fumadocs/base/contexts/i18n';
import { mergeRefs } from '@/components/fumadocs/base/merge-refs';
export const TOCItems = ({
  ref,
  className,
  ...props
}: ComponentProps<'div'>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useTOCItems();
  const { text } = useI18n();
  if (items.length === 0)
    return (
      <div className='rounded-lg border bg-fd-card p-3 text-xs text-fd-muted-foreground'>
        {text.tocNoHeadings}
      </div>
    );
  return (
    <>
      <TocThumb
        containerRef={containerRef}
        className='absolute top-(--fd-top) h-(--fd-height) w-0.5 rounded-e-sm bg-fd-primary transition-[top,height] ease-linear'
      />
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn(
          'flex flex-col border-s border-fd-foreground/10',
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <TOCItem key={item.url} item={item} />
        ))}
      </div>
    </>
  );
};
const TOCItem = ({ item }: { item: Primitive.TOCItemType }) => {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        'prose py-1.5 text-sm text-fd-muted-foreground transition-colors wrap-anywhere first:pt-0 last:pb-0 data-[active=true]:text-fd-primary',
        item.depth <= 2 && 'ps-3',
        item.depth === 3 && 'ps-6',
        item.depth >= 4 && 'ps-8',
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
};
