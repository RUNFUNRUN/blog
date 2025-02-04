import { title as homeTitle } from '@/app/layout.config';
import { TagCard } from '@/components/tag-card';
import { getTags } from '@/lib/source';
import type { Metadata } from 'next';

const Page = () => {
  const tags = getTags();

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>タグ一覧</h1>
      <div className='flex gap-2 flex-wrap'>
        {tags.map((tag) => (
          <TagCard name={tag} key={tag} />
        ))}
      </div>
    </div>
  );
};

export default Page;

export const generateMetadata = () => {
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
  } satisfies Metadata;
};
