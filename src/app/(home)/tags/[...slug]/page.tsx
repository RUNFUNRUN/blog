import { title as homeTitle, postsPerPage } from '@/app/layout.config';
import { TagJsonLd } from '@/components/json-ld';
import { Pagination } from '@/components/pagination';
import { PostCard } from '@/components/post-card';
import { getPostsByTag, getTags } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

const totalPosts = (title: string) => getPostsByTag(title).length;
const pageCount = (title: string) =>
  Math.ceil(totalPosts(title) / postsPerPage);

const DisplayCurrentPosts = ({
  startIndex,
  endIndex,
  tag,
}: {
  startIndex: number;
  endIndex: number;
  tag: string;
}) => {
  const start = startIndex + 1;
  const end = endIndex < totalPosts(tag) ? endIndex : totalPosts(tag);
  if (start === end) return <span>({start})</span>;
  return (
    <span>
      ({start}-{end})
    </span>
  );
};

const Page = async (props: { params: Promise<{ slug: string[] }> }) => {
  const params = await props.params;
  const tag = params.slug[0];
  const pageIndex =
    params.slug.length > 1 ? Number.parseInt(params.slug[1], 10) - 1 : 0;

  if (pageIndex < 0 || pageIndex >= pageCount(tag)) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = getPostsByTag(tag).slice(startIndex, endIndex);

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>
        {tag} 全{getPostsByTag(tag).length}記事{' '}
        <DisplayCurrentPosts
          startIndex={startIndex}
          endIndex={endIndex}
          tag={tag}
        />
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
        <Pagination
          current={pageIndex + 1}
          end={pageCount(tag)}
          path={`/tags/${tag}`}
        />
      </div>
      <TagJsonLd tag={tag} />
    </>
  );
};

export default Page;

export const generateStaticParams = () => {
  const tags = getTags();
  return [
    ...tags.map((tag) => ({ slug: [tag] })),
    ...tags.flatMap((tag) =>
      Array.from({ length: pageCount(tag) }, (_, index) => ({
        slug: [tag, (index + 1).toString()],
      })),
    ),
  ];
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string[] }>;
}) => {
  const params = await props.params;
  const slug = params.slug;

  const tag = slug[0];
  const index = slug.length > 1 ? ` - ${slug[1]}ページ` : '';
  const title = `${homeTitle} ${tag}の記事${index}`;

  const imageParams = new URLSearchParams();
  imageParams.set('title', tag);

  return {
    title,
    openGraph: {
      title,
      images: `/api/og?${imageParams}`,
      url: `/list/${slug ? slug[0] : ''}`,
    },
    twitter: {
      title,
      images: `/api/og?${imageParams}`,
    },
    alternates: {
      canonical: `/tags/${tag}`,
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
};
