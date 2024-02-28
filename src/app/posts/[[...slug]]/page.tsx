import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { RollButton } from 'fumadocs-ui/components/roll-button';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const post = getPage(params.slug);

  if (post === undefined) {
    notFound();
  }

  const lastModified = post.data.exports.lastModified;
  let date = 'unknown date';
  let lastUpdate: Date | undefined = undefined;
  if (lastModified !== undefined) {
    date = new Date(lastModified).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });
    lastUpdate = new Date(lastModified);
  }

  const MDX = post.data.exports.default;

  return (
    <DocsPage toc={post.data.exports.toc} lastUpdate={lastUpdate}>
      <RollButton />
      <DocsBody>
        <h4 className='text-right'>{date}</h4>
        <h1 className='mb-auto'>{post.data.title}</h1>
        <p className='mt-4 mb-10'>{post.data.description}</p>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export const generateStaticParams = async () => {
  return getPages().map((page) => ({
    slug: page.slugs,
  }));
};

export const generateMetadata = ({ params }: { params: { slug?: string[] } }) => {
  const post = getPage(params.slug);

  if (post === undefined) notFound();

  const title = post.data.title;
  const description = post.data.description;
  const imageParams = new URLSearchParams();
  imageParams.set('title', title);
  imageParams.set('description', description ?? '');

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: '/api/og?' + imageParams.toString(),
      url: post.url,
    },
    twitter: {
      title: title,
      description: description,
      images: '/api/og?' + imageParams.toString(),
    },
  } satisfies Metadata;
};
