import { InlineLink } from '@/components/inline-link';
import { PostCard } from '@/components/post-card';
import { getPostsSortedByDate } from '@/lib/source';

const Page = () => {
  const posts = getPostsSortedByDate().slice(0, 3);

  return (
    <div className='space-y-12'>
      <div className='text-2xl font-bold'>
        <p>
          RUNFUNRUNのテックブログです。私については
          <InlineLink href='https://runfun.run' blank>
            runfun.run
          </InlineLink>
          をご覧ください。
        </p>
        <p>
          ご連絡は
          <InlineLink href='https://runfun.run/contact' blank>
            runfun.run/contact
          </InlineLink>
          かDiscord(ID: runfunrun)のDMからお願いします。
        </p>
        <p>Issueもお気軽に立ててください。</p>
      </div>
      <div className='space-y-4'>
        <p className='text-2xl sm:text-3xl font-bold'>
          最新の記事 (<InlineLink href='/list'>記事一覧</InlineLink>)
        </p>
        <div className='flex flex-col gap-4 text-left'>
          {posts.map((post) => {
            return (
              <PostCard
                title={post.data.title}
                description={post.data.description ?? ''}
                url={post.url}
                date={post.data.date}
                key={post.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
