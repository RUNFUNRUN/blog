import { getPostsByTag } from '@/lib/source';
import { TagIcon } from 'lucide-react';
import Link from 'next/link';

export const TagCard = ({ name }: { name: string }) => {
  const numOfPosts = getPostsByTag(name);

  return (
    <Link
      href={`/tags/${name}`}
      className='rounded-lg border bg-fd-card text-fd-card-foreground shadow-md transition-colors hover:bg-fd-accent/80 flex gap-1 no-underline text-lg p-1'
    >
      <TagIcon size={18} className='my-auto text-fd-muted-foreground' />
      <span className='text-fd-card-foreground'>{name}</span>
      <span className='text-fd-muted-foreground'>({numOfPosts.length})</span>
    </Link>
  );
};
