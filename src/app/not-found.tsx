import { HomeLayout } from 'fumadocs-ui/layouts/home';
import Image from 'next/image';

const NotFound = () => {
  return (
    <HomeLayout
      nav={{
        title: 'RUNFUNRUN.dev',
      }}
      githubUrl='https://github.com/RUNFUNRUN/blog'
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
