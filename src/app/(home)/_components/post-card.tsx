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
    <article className='rounded-lg border bg-card p-4 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground w-full'>
      <Link href={url}>
        <h2 className='mt-2 text-xl font-medium'>{title}</h2>
        <p className='overflow-hidden overflow-ellipsis whitespace-nowrap text-medium text-muted-foreground'>
          {description}
        </p>
        <h3 className='text-right font-medium'>{date}</h3>
      </Link>
    </article>
  );
};
