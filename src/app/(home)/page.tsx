import { InlineLink } from '@/components/inline-link';
import { PostCard } from '@/components/post-card';
import { getPostsSortedByDate } from '@/lib/source';

const HomePage = () => {
  const posts = getPostsSortedByDate().slice(0, 3);

  return (
    <div className='space-y-12'>
      <div className='text-2xl font-bold'>
        <p>
          RUNFUNRUNのブログです。私については
          <InlineLink href='https://runfun.run' blank>
            runfun.run
          </InlineLink>
          をご覧ください。
        </p>
        <p>
          問い合わせは
          <InlineLink href='https://runfun.run/contact' blank>
            runfun.run/contact
          </InlineLink>
          かDiscord(ID: runfunrun)のDMからお願いします。
        </p>
        <p>また、記事に誤りを見つけた場合は連絡またはIssue頂けると幸いです。</p>
      </div>
      <div className='space-y-4'>
        <p className='text-2xl sm:text-3xl font-bold'>
          最新の記事 (<InlineLink href='/list'>記事一覧</InlineLink>)
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
    </div>
  );
};

export default HomePage;
