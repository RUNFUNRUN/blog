import { title as homeTitle } from '@/app/layout.config';
import type { Post } from '@/lib/source';
import type { BlogPosting, BreadcrumbList, Graph } from 'schema-dts';

export const JsonLd = ({ post }: { post: Post }) => {
  if (!post) {
    return null;
  }

  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ).toString();

  const url = new URL(post.url, baseUrl).toString();

  const imageParams = new URLSearchParams();
  imageParams.set('title', post.data.title);
  imageParams.set('description', post.data.description ?? '');

  const blogPosting: BlogPosting = {
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    image: new URL(`/api/og?${imageParams}`, baseUrl).toString(),
    datePublished: new Date(post.data.date).toISOString(),
    dateModified: post.data.lastModified
      ? new Date(post.data.lastModified).toISOString()
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: 'RUNFUNRUN',
      url: 'https://runfun.run',
    },
    publisher: {
      '@type': 'Person',
      name: 'RUNFUNRUN',
    },
  };

  const breadcrumbList: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeTitle,
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${homeTitle} | 記事一覧`,
        item: new URL('/list', baseUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.data.title,
        item: url,
      },
    ],
  };

  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [blogPosting, breadcrumbList],
  };

  return (
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml:
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};
