import Link from 'next/link';
import { getPages } from '@/app/source';
import { PostCard } from './_components/PostCard';

export default function HomePage() {
  const posts = getPages()
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
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
              target='_blank'
            >
              こちら
            </Link>
            。
          </p>
          <p>質問等はプロフィールのコンタクトかDiscordのDMからお願いします。</p>
          <p>
            また、記事には誤りがある可能性があります。もし見つけた場合も連絡くれると嬉しいです。
          </p>
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
          {posts.map((post, i) => {
            const date = new Date(post.data.date).toLocaleDateString('ja-JP', {
              timeZone: 'Asia/Tokyo',
            });
            return (
              <PostCard
                title={post.data.title}
                description={post.data.description ?? ''}
                url={post.url}
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
