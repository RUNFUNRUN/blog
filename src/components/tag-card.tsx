import { getPostsByTag } from '@/lib/source';
import { TagIcon } from 'lucide-react';
import Link from 'next/link';

export const TagCard = ({
  name,
  displayCount = false,
}: { name: string; displayCount?: boolean }) => {
  const numOfPosts = getPostsByTag(name);

  return (
    <Link
      href={`/tags/${name}`}
      className='rounded-md border bg-fd-card text-fd-card-foreground shadow-md transition-colors hover:bg-fd-accent/80 flex gap-1 no-underline text-lg px-2 py-0.5'
    >
      <TagIcon size={18} className='my-auto text-fd-muted-foreground' />
      <span className='text-fd-card-foreground'>{name}</span>
      {displayCount && (
        <span className='text-fd-muted-foreground'>({numOfPosts.length})</span>
      )}
    </Link>
  );
};
