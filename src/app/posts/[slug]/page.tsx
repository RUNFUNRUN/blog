import { PostJsonLd } from '@/components/json-ld';
import { LinkPreview } from '@/components/link-preview';
import { TagCard } from '@/components/tag-card';
import { getPost, getPosts } from '@/lib/source';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import {
  ImageZoom,
  type ImageZoomProps,
} from 'fumadocs-ui/components/image-zoom';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody as PostsBody,
  DocsDescription as PostsDescription,
  DocsPage as PostsPage,
  DocsTitle as PostsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const post = getPost([params.slug]);

  if (post === undefined) {
    notFound();
  }

  const date = new Date(post.data.date).toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });

  const lastModified = post.data.lastModified;
  const lastUpdate = lastModified ? new Date(lastModified) : undefined;
  const tags = post.data.tags ?? [];

  const path = `content/${post.file.path}`;

  const MDX = post.data.body;

  return (
    <PostsPage
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
      <PostsTitle>{post.data.title}</PostsTitle>
      <PostsDescription className='mb-0'>
        {post.data.description}
      </PostsDescription>
      <div className='flex gap-2 flex-wrap mb-8'>
        {tags.map((tag) => (
          <TagCard name={tag} key={tag} />
        ))}
      </div>
      <PostsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            img: (props: ImageZoomProps) => <ImageZoom {...props} />,
            pre: ({ ...props }) => (
              <CodeBlock
                {...props}
                viewportProps={{
                  className: 'max-h-fit',
                }}
              >
                <Pre>{props.children}</Pre>
              </CodeBlock>
            ),
            LinkPreview,
          }}
        />
      </PostsBody>
      <PostJsonLd post={post} />
    </PostsPage>
  );
};

export default Page;

export const generateStaticParams = () => {
  return getPosts().map((page) => ({
    slug: page.slugs[0],
  }));
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const post = getPost([params.slug]);
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
    alternates: {
      canonical: post.url,
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  } satisfies Metadata;
};
