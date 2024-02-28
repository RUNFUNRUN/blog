import Link from 'next/link';
import { getPages } from '@/app/source';
import { LinkCard } from './_components/LinkCard';

export default function HomePage() {
  const pages = getPages()
    .sort((a, b) => (b.data.exports.lastModified ?? 0) - (a.data.exports.lastModified ?? 0))
    .slice(0, 5);

  return (
    <main>
      <div className='mx-4 my-6 lg:mx-auto lg:w-[992px]'>
        <div className='my-6 text-2xl font-bold'>
          <p>
            RUNFUNRUNのブログです。プロフィールは
            <Link
              href='https://www.runfunrun.info'
              className='text-blue-500 hover:underline hover:text-blue-400 mx-1'
            >
              こちら
            </Link>
            。
          </p>
          <p>質問等はプロフィールのコンタクトかDiscordのDMからお願いします。</p>
        </div>
        <div>
          <h2 className='text-2xl sm:text-3xl font-bold my-4'>
            最新の記事 (
            <Link href='/list' className='text-blue-500 hover:underline hover:text-blue-400 mx-1'>
              全記事はこちら
            </Link>
            )
          </h2>
        </div>
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
      </div>
    </main>
  );
}
