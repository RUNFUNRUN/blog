import { description, title } from '@/app/layout.config';
import { getPages } from '@/libs/source';
import RSS from 'rss';

const baseUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
);

export const revalidate = 86400; //60 * 60 * 24 * 1

export const GET = () => {
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
      'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`,
    },
  });
};
