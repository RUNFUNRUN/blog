import { title as homeTitle, postsPerPage } from '@/app/layout.config';
import { Pagination } from '@/components/pagination';
import { PostCard } from '@/components/post-card';
import { getSortedByDatePosts } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

const totalPosts = getSortedByDatePosts().length;
const pageCount = Math.ceil(totalPosts / postsPerPage);

const DisplayCurrentPosts = ({
  startIndex,
  endIndex,
}: {
  startIndex: number;
  endIndex: number;
}) => {
  const start = startIndex + 1;
  const end = endIndex < totalPosts ? endIndex : totalPosts;
  if (start === end) return <span>({start})</span>;
  return (
    <span>
      ({start}-{end})
    </span>
  );
};

const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
  const params = await props.params;
  const pageIndex = params.slug ? Number.parseInt(params.slug[0], 10) - 1 : 0;
  if (pageIndex < 0 || pageIndex >= pageCount) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = getSortedByDatePosts().slice(startIndex, endIndex);

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>
        全{totalPosts}記事{' '}
        <DisplayCurrentPosts startIndex={startIndex} endIndex={endIndex} />
      </h1>
      <div className='flex flex-col gap-4 text-left'>
        {posts.map((post) => {
          const date = new Date(post.data.date).toLocaleDateString('ja-JP', {
            timeZone: 'Asia/Tokyo',
          });
          return (
            <PostCard
              title={post.data.title}
              description={post.data.description ?? ''}
              url={post.url}
              date={date}
              key={post.url}
            />
          );
        })}
      </div>
      <div className='mt-6'>
        <Pagination current={pageIndex + 1} end={pageCount} path='/list' />
      </div>
    </>
  );
};

export default Page;

export const generateStaticParams = () => {
  const slugs = Array.from({ length: pageCount }, (_, index) => ({
    slug: [(index + 1).toString()],
  }));

  return [{ slug: [] }, ...slugs];
};

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const params = await props.params;
  const slug = params.slug;

  const index = slug ? ` - ${slug[0]}ページ` : '';
  const title = `${homeTitle} | 記事一覧${index}`;

  return {
    title,
    openGraph: {
      title,
      images: '/api/og',
      url: `/list/${slug ? slug[0] : ''}`,
    },
    twitter: {
      title,
      images: '/api/og',
    },
    alternates: {
      canonical: '/list',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
};
