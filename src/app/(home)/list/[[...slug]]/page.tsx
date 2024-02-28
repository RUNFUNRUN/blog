import Link from 'next/link';
import { getPages } from '@/app/source';
import { notFound } from 'next/navigation';
import { Pagination } from '../_components/Pagination';
import { LinkCard } from '../../_components/LinkCard';

const totalPosts = getPages().length;
const postsPerPage = 5;
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
      ({start}~{end})
    </span>
  );
};

export default function HomePage({ params }: { params: { slug?: string[] } }) {
  const pageIndex = params.slug ? parseInt(params.slug[0], 10) - 1 : 0;
  if (pageIndex < 0 || pageIndex >= pageCount) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const pages = getPages()
    .sort((a, b) => (b.data.exports.lastModified ?? 0) - (a.data.exports.lastModified ?? 0))
    .slice(startIndex, endIndex);

  return (
    <main>
      <div className='mx-4 my-6 lg:mx-auto lg:w-[992px]'>
        <h2 className='text-3xl font-bold my-4'>
          全{totalPosts}記事 <DisplayCurrentPosts startIndex={startIndex} endIndex={endIndex} />
        </h2>
        <div className='flex flex-col gap-4 text-left'>
          {pages.map((page, i) => {
            const lastModified = page.data.exports.lastModified;
            let date = 'unknown date';
            if (lastModified !== undefined) {
              date = new Date(lastModified).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });
            }
            return (
              <LinkCard
                title={page.data.title}
                description={page.data.description ?? ''}
                url={page.url}
                date={date}
                key={i}
              />
            );
          })}
        </div>
        <div className='my-6'>
          <Pagination current={pageIndex + 1} end={pageCount} path='/list' />
        </div>
      </div>
    </main>
  );
}

export const generateStaticParams = async () => {
  const slugs = Array.from({ length: pageCount }, (_, index) => ({
    slug: [(index + 1).toString()],
  }));

  return [{ slug: [] }, ...slugs];
};
