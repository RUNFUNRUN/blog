import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { Header } from '@/components/header';
import { InlineLink } from '@/components/inline-link';
import { baseOptions, linkItems } from './layout.config';

const NotFound = () => {
  return (
    <HomeLayout
      {...baseOptions}
      links={linkItems}
      nav={{
        component: (
          <Header
            finalLinks={getLinks(linkItems, baseOptions.githubUrl)}
            {...baseOptions}
          />
        ),
      }}
    >
      <div className='my-12 space-y-4 text-center'>
        <p className='text-4xl font-bold'>404 Not Found</p>
        <p className='text-lg'>
          <span className='block md:inline'>
            記事のURLが変更された可能性があります。
          </span>
          <span className='block md:inline'>
            お手数ですが、<InlineLink href='/list'>記事一覧</InlineLink>
            をご確認ください。
          </span>
        </p>
        <div>
          <p className='text-lg'>
            代わりに吉村家のラーメンの飯テロをお送りします。
          </p>
          <Image
            src='/ramen.jpg'
            width={800}
            height={600}
            alt='yoshimueraya'
            className='mx-auto'
          />
        </div>
      </div>
    </HomeLayout>
  );
};

export default NotFound;
