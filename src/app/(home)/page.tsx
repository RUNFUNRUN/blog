import { InlineLink } from '@/components/inline-link';
import { PostCard } from '@/components/post-card';
import { getSortedByDatePosts } from '@/lib/source';

const HomePage = () => {
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <main className='mx-4 my-12 space-y-12 lg:mx-auto lg:w-[992px]'>
      <div className='text-2xl font-bold'>
        <p>
          RUNFUNRUNのブログです。プロフィールは
          <InlineLink href='https://runfun.run' blank>
            こちら
          </InlineLink>
          。
        </p>
        <p>
          問い合わせはプロフィールの
          <InlineLink href='https://runfun.run/contact' blank>
            Contact
          </InlineLink>
          かDiscord(ID: runfunrun)のDMからお願いします。
        </p>
        <p>
          また、記事には誤りがある可能性があります。もし見つけた場合は連絡またはIssue頂けると幸いです。
        </p>
      </div>
      <div className='space-y-4'>
        <p className='text-2xl sm:text-3xl font-bold'>
          最新の記事 (<InlineLink href='/list'>全記事一覧</InlineLink>)
        </p>
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
      </div>
    </main>
  );
};

export default HomePage;
