import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { RollButton } from 'fumadocs-ui/components/roll-button';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page === undefined) {
    notFound();
  }

  const lastModified = page.data.exports.lastModified;
  let date = 'unknown date';
  let lastUpdate: Date | undefined = undefined;
  if (lastModified !== undefined) {
    date = new Date(lastModified).toLocaleDateString();
    lastUpdate = new Date(lastModified);
  }

  const MDX = page.data.exports.default;

  return (
    <DocsPage toc={page.data.exports.toc} lastUpdate={lastUpdate}>
      <RollButton />
      <DocsBody>
        <h4 className='text-right'>{date}</h4>
        <h1 className='mb-auto'>{page.data.title}</h1>
        <p className='mt-4 mb-10'>{page.data.description}</p>
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
  const page = getPage(params.slug);

  if (page === undefined) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
    },
  } satisfies Metadata;
};
