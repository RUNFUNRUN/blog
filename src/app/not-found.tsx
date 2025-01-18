import { Header } from '@/components/header';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
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
      <div className='text-center'>
        <p className='my-4 text-4xl font-bold'>404 Not Found</p>
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
    </HomeLayout>
  );
};

export default NotFound;
