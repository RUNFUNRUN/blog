import { getPages } from '@/libs/source';
import { InlineLink } from './_components/inline-link';
import { PostCard } from './_components/post-card';

const HomePage = () => {
  const posts = getPages()
    .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 5);

  return (
    <main className='mx-4 my-12 lg:mx-auto lg:w-[992px]'>
      <div className='mb-6 text-2xl font-bold'>
        <p>
          RUNFUNRUNのブログです。プロフィールは
          <InlineLink href='https://runfun.run' blank>
            こちら
          </InlineLink>
          。
        </p>
        <p>
          質問等はポートフォリオの
          <InlineLink href='https://runfun.run/contact' blank>
            Contact
          </InlineLink>
          かDiscord(ID: runfunrun)のDMからお願いします。
        </p>
        <p>
          また、記事には誤りがある可能性があります。もし見つけた場合は連絡またはIssue頂けると幸いです。
        </p>
      </div>
      <div>
        <p className='text-2xl sm:text-3xl font-bold my-4'>
          最新の記事 (<InlineLink href='/list'>全記事はこちら</InlineLink>)
        </p>
      </div>
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
    </main>
  );
};

export default HomePage;
