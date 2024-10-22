import { getPage, getPages } from '@/libs/source';
import defaultComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
  const params = await props.params;
  const post = getPage(params.slug);

  if (post === undefined) {
    notFound();
  }

  const date = new Date(post.data.date).toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });

  const lastModified = post.data.lastModified;
  const lastUpdate = lastModified ? new Date(lastModified) : undefined;

  const path = `content/${post.file.path}`;

  const MDX = post.data.body;

  return (
    <DocsPage
      toc={post.data.toc}
      full={post.data.full}
      lastUpdate={lastUpdate}
      editOnGithub={{
        repo: 'blog',
        owner: 'RUNFUNRUN',
        sha: 'main',
        path,
      }}
      tableOfContent={{
        style: 'clerk',
        single: false,
      }}
    >
      <p className='text-right'>{date}</p>
      <DocsTitle>{post.data.title}</DocsTitle>
      <DocsDescription>{post.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={defaultComponents} />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;

export const generateStaticParams = () => {
  return getPages().map((page) => ({
    slug: page.slugs,
  }));
};

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const params = await props.params;
  const post = getPage(params.slug);
  if (post === undefined) return;

  const title = post.data.title;
  const description = post.data.description;
  const imageParams = new URLSearchParams();
  imageParams.set('title', title);
  imageParams.set('description', description ?? '');

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    ),
    title,
    description,
    openGraph: {
      title,
      description,
      images: `/api/og?${imageParams}`,
      url: post.url,
    },
    twitter: {
      title,
      description,
      images: `/api/og?${imageParams}`,
    },
  } satisfies Metadata;
};
