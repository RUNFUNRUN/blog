import Link from 'next/link';
import { getPages } from '@/app/source';
import { notFound } from 'next/navigation';
import { Pagination } from '../_components/Pagination';

const totalPosts = getPages().length;
const postsPerPage = 5;
const pageCount = Math.ceil(totalPosts / postsPerPage);

export default function HomePage({ params }: { params: { slug?: string[] } }) {
  const pageIndex = params.slug ? parseInt(params.slug[0], 10) - 1 : 0;
  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const pages = getPages()
    .sort((a, b) => (b.data.exports.lastModified ?? 0) - (a.data.exports.lastModified ?? 0))
    .slice(startIndex, endIndex);

  if (startIndex >= totalPosts) notFound();

  return (
    <main>
      <div className='mx-4 my-6 lg:mx-auto lg:w-[992px]'>
        <h2 className='text-3xl font-bold my-4'>
          全{totalPosts}記事一覧({startIndex + 1}~{endIndex < totalPosts ? endIndex : totalPosts})
        </h2>
        <div className='flex flex-col gap-4 text-left'>
          {pages.map((page, i) => {
            const lastModified = page.data.exports.lastModified;
            let date = 'unknown date';
            if (lastModified !== undefined) {
              date = new Date(lastModified).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });
            }
            return (
              <Link
                href={page.url}
                className='rounded-lg border bg-card p-4 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground w-full'
                key={i}
              >
                <h2 className='mt-2 text-xl font-medium'>{page.data.title}</h2>
                <p className='overflow-hidden overflow-ellipsis whitespace-nowrap text-medium text-muted-foreground'>
                  {page.data.description}
                </p>
                <h3 className='text-right font-medium'>{date}</h3>
              </Link>
            );
          })}
        </div>
        <div className='my-6'>
          <Pagination current={pageIndex + 1} end={pageCount} path='/all' />
        </div>
      </div>
    </main>
  );
}

export const generateStaticParams = async () => {
  const slugs = Array.from({ length: pageCount }, (_, index) => ({
    params: { slug: [(index + 1).toString()] },
  }));

  return slugs;
};
