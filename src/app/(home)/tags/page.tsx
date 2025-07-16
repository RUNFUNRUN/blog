import type { Metadata } from 'next';
import { title as homeTitle } from '@/app/layout.config';
import { TagCard } from '@/components/tag-card';
import { getTags } from '@/lib/source';

const Page = () => {
  const tags = getTags();

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>タグ一覧</h1>
      <div className='flex gap-2 flex-wrap'>
        {tags.map((tag) => (
          <TagCard name={tag} displayCount={true} key={tag} />
        ))}
      </div>
    </div>
  );
};

export default Page;

export const generateMetadata = (): Metadata => {
  const title = `${homeTitle} | タグ一覧`;

  return {
    title,
    openGraph: {
      title,
      images: '/api/og',
      url: '/tags',
    },
    alternates: {
      canonical: '/tags',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  };
};
