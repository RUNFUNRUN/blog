import { description, title } from '@/app/layout.config';
import { getPages } from '@/libs/source';
import RSS from 'rss';

const url = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
);

export const revalidate = 86400; //60 * 60 * 24 * 1

export const GET = () => {
  const feed = new RSS({
    title,
    description,
    site_url: url.toString(),
    feed_url: new URL('/api/rss.xml', url).toString(),
    language: 'ja',
  });

  const pages = getPages();

  for (const page of pages) {
    feed.item({
      title: page.data.title,
      description: page.data.description ?? '',
      url: new URL(page.url, url).toString(),
      date: page.data.date,
    });
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`,
    },
  });
};
