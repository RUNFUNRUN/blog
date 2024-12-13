import { description, title } from '@/app/layout.config';
import { getPages } from '@/libs/source';
import RSS from 'rss';

export const dynamic = 'force-static';

export const GET = () => {
  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  );

  const feed = new RSS({
    title,
    description,
    site_url: baseUrl.toString(),
    feed_url: new URL('/api/rss.xml', baseUrl).toString(),
    language: 'ja',
  });

  const posts = getPages();

  for (const post of posts) {
    feed.item({
      title: post.data.title,
      description: post.data.description ?? '',
      url: new URL(post.url, baseUrl).toString(),
      date: post.data.date,
    });
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
