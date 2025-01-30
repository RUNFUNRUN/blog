import Link from 'next/link';

export const PostCard = ({
  title,
  description,
  url,
  date,
}: {
  title: string;
  description: string;
  url: string;
  date: string;
}) => {
  return (
    <article className='rounded-lg border bg-fd-card text-fd-card-foreground shadow-md transition-colors hover:bg-fd-accent/80 w-full'>
      <Link href={url} className='block p-4'>
        <h2 className='mt-2 text-xl font-medium'>{title}</h2>
        <p className='overflow-hidden text-ellipsis whitespace-nowrap text-medium text-fd-muted-foreground'>
          {description}
        </p>
        <p className='text-right font-medium'>{date}</p>
      </Link>
    </article>
  );
};
